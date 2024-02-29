import { requestRecipe } from '../requestRecipe';
import { CreateRecipeParams, IdResponse } from '../typesRecipe';

const createRecipe = (recipeData: CreateRecipeParams) =>
    requestRecipe.post<IdResponse>('/recipes', recipeData);

export default createRecipe;