export interface Ingredient {
    name: string;
    amount: string;
}

export interface Recipe {
    id: number;
    title: string;
    instruction: string;
    ingredients: Ingredient[];
}

export interface GetRecipesParams {
    pageNumber: number;
    title?: string | null;
    filter?: string[] | null;
}

export interface CreateRecipeParams {
    title: string;
    instruction: string;
    ingredients: string;
}

export interface UpdateRecipeParams {
    id: number;
    title: string;
    instruction: string;
    ingredients: string;
}

export interface IdResponse {
    data: string;
}

export interface RecipeResponse {
    data: Recipe;
}

export interface MsgResponse {
    msg: string;
}

export interface RecipeListResponse {
    data: { recipes: Recipe[], ingredientList: string[], count: number };
}