import { PrismaClient } from '@prisma/client';
import { Message } from '../../constants';
import backLogger from '../../logger';
import { RecipeIO } from './types';

class BaseService {

    protected prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    protected async handleErrors<T>(promise: Promise<T>): Promise<T> {
        try {
            return await promise;
        } catch (error) {
            backLogger.error(Message.INTERNAL_SERVER_ERROR, error);
            throw error;
        }
    }

    async findOrCreateIngredient(name: string): Promise<number> {
        return this.handleErrors(this.prisma.ingredient.findFirst({
            where: { name },
        }).then(async ingredient => {
            if (!ingredient) {
                ingredient = await this.prisma.ingredient.create({
                    data: { name },
                });
            }
            return ingredient.id;
        }));
    }
}

export class RecipeService extends BaseService {

    constructor() {
        super();
        this.findOrCreateIngredient = this.findOrCreateIngredient.bind(this);
    }

    async findIngredientList(): Promise<string[]> {
        return this.handleErrors(this.prisma.ingredient.findMany({
            select: {
                name: true
            }
        }).then(ingredients => ingredients.map(ingredient => ingredient.name)));
    }

    async findAll(pageNumber: number, title: string | null, filter: string[] | null): Promise<{ recipes: RecipeIO[], count: number }> {
        return this.handleErrors(this.prisma.recipe.findMany({
            include: {
                ingredients: {
                    include: {
                        ingredient: true,
                    },
                },
            },
            where: {
                title: title ? {
                    contains: title,
                    mode: 'insensitive'
                } : undefined,
                ingredients: filter && filter.length > 0 ? {
                    some: {
                        ingredient: {
                            name: {
                                in: filter
                            }
                        }
                    }
                } : undefined,
            },
            skip: (pageNumber - 1) * 9,
            take: 9,
        }).then(async recipes => {
            const totalRecipes = await this.prisma.recipe.count({
                where: {
                    title: title ? {
                        contains: title,
                        mode: 'insensitive'
                    } : undefined,
                    ingredients: filter && filter.length > 0 ? {
                        some: {
                            ingredient: {
                                name: {
                                    in: filter
                                }
                            }
                        }
                    } : undefined,
                }
            });
            const count = Math.ceil(totalRecipes / 9);

            return {
                recipes: recipes.map(recipe => ({
                    id: recipe.id,
                    title: recipe.title,
                    instruction: recipe.instruction,
                    ingredients: recipe.ingredients.map(ri => ({
                        name: ri.ingredient.name,
                        amount: ri.amount,
                    })),
                })),
                count
            };
        }));
    }

    async findRecipeById(recipeId: number): Promise<RecipeIO | null> {
        return this.handleErrors(this.prisma.recipe.findUnique({
            where: { id: recipeId },
            include: {
                ingredients: {
                    include: {
                        ingredient: true,
                    },
                },
            },
        }).then(recipe => {
            if (!recipe) return null;
            return {
                id: recipe.id,
                title: recipe.title,
                instruction: recipe.instruction,
                ingredients: recipe.ingredients.map(ri => ({
                    name: ri.ingredient.name,
                    amount: ri.amount,
                })),
            };
        }));
    }

    async createRecipe({ title, instruction, ingredients }: RecipeIO): Promise<string> {
        return this.handleErrors(this.prisma.recipe.create({
            data: {
                title,
                instruction,
            },
            include: {
                ingredients: true,
            },
        }).then(async recipe => {
            await Promise.all(ingredients.map(async ({ name, amount }) => {
                const ingredientId = await this.findOrCreateIngredient(name);
                return this.prisma.recipeIngredient.create({
                    data: {
                        recipeId: recipe.id,
                        ingredientId,
                        amount,
                    },
                });
            }));
            return recipe.id.toString();
        }));
    }

    async updateRecipeById({ id, title, instruction, ingredients }: RecipeIO): Promise<string> {
        return this.handleErrors(this.prisma.recipe.update({
            where: { id },
            data: {
                title,
                instruction,
                ingredients: {
                    deleteMany: {},
                    createMany: {
                        data: await Promise.all(ingredients.map(async ({ name, amount }) => {
                            const ingredientId = await this.findOrCreateIngredient(name);
                            return {
                                amount,
                                ingredientId,
                            };
                        })),
                    },
                },
            },
            select: { id: true },
        }).then(updatedRecipe => {
            return updatedRecipe.id.toString();
        }));
    }

    async deleteRecipeById(recipeId: number): Promise<string> {
        return this.handleErrors(this.prisma.recipe.delete({
            where: { id: recipeId },
            include: {
                ingredients: true,
            },
        }).then(async (deletedRecipe) => {
            const ingredientsToDelete: number[] = [];

            await Promise.all(deletedRecipe.ingredients.map(async (ri) => {
                const ingredientId = ri.ingredientId;
                const recipeCount = await this.prisma.recipeIngredient.count({
                    where: { ingredientId: ri.ingredientId },
                });
                if (recipeCount === 1) {
                    ingredientsToDelete.push(ingredientId);
                }
            }));
            
            await this.prisma.ingredient.deleteMany({
                where: { id: { in: ingredientsToDelete } },
            });

            return Message.DELETE_SUCCESS;
        }));
    }
}