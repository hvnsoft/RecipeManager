import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import mainService from '../../services';
import backLogger from '../../logger';
import { Message } from "../../constants";

class BaseRecipeController {

    protected async handleRequest(req: Request, res: Response, callback: () => Promise<any>): Promise<void> {
        try {
            const result = await callback();
            res.status(StatusCodes.OK).json(result);
        } catch (error) {
            backLogger.error(Message.INTERNAL_SERVER_ERROR, error);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: error });
        }
    }

    protected parseIngredients(ingredients: string): { name: string, amount: string }[] {
        try {
            ingredients = ingredients.trim();
            if (ingredients.endsWith(',') || ingredients.endsWith('.')) {
                ingredients = ingredients.slice(0, -1);
            }
            return ingredients.split(/[,.]/).map((ingredient: string) => {
                const [name, amount] = ingredient.trim().split(/[:;]/).map(part => part.trim());
                const processedName = name.trim();
                const processedAmount = amount.trim() ? amount.trim() : "some";
                return { name: processedName, amount: processedAmount };
            });
        } catch (error) {
            throw new Error(Message.PARSE_INGREDIENT_ERROR);
        }
    }
}

export class RecipeController extends BaseRecipeController {

    constructor() {
        super();
        this.getRecipes = this.getRecipes.bind(this);
        this.getRecipeById = this.getRecipeById.bind(this);
        this.createRecipe = this.createRecipe.bind(this);
        this.updateRecipeById = this.updateRecipeById.bind(this);
        this.deleteRecipeById = this.deleteRecipeById.bind(this);
    }

    async getRecipes(req: Request, res: Response): Promise<void> {
        await this.handleRequest(req, res, async () => {
            const { pageNumber, title, filter } = req.query;
            const { recipes, count } = await mainService.recipeService.findAll(Number(pageNumber), title as string, filter as string[]);
            const ingredientList = await mainService.recipeService.findIngredientList();
            return { recipes, ingredientList, count };
        });
    }

    async getRecipeById(req: Request, res: Response): Promise<void> {
        await this.handleRequest(req, res, async () => {
            const id = req.params.id;
            const data = await mainService.recipeService.findRecipeById(Number(id));
            return { data };
        });
    }

    async createRecipe(req: Request, res: Response): Promise<void> {
        await this.handleRequest(req, res, async () => {
            const { title, instruction, ingredients } = req.body;
            const ingredientsArray = this.parseIngredients(ingredients);
            const data = await mainService.recipeService.createRecipe({ title, instruction, ingredients: ingredientsArray });
            return { data };
        });
    }

    async updateRecipeById(req: Request, res: Response): Promise<void> {
        await this.handleRequest(req, res, async () => {
            const { id, title, instruction, ingredients } = req.body;
            const ingredientsArray = this.parseIngredients(ingredients);
            const data = await mainService.recipeService.updateRecipeById({ id: Number(id), title, instruction, ingredients: ingredientsArray });
            return { data };
        });
    }

    async deleteRecipeById(req: Request, res: Response): Promise<void> {
        await this.handleRequest(req, res, async () => {
            const id = req.params.id;
            const msg = await mainService.recipeService.deleteRecipeById(Number(id));
            return { msg };
        });
    }
}