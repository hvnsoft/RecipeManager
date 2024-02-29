import { requestRecipe } from '../requestRecipe';
import { RecipeListResponse, GetRecipesParams } from '../typesRecipe';

const getRecipes = (params: GetRecipesParams) =>
    requestRecipe.get<RecipeListResponse>('/recipes', {params});

export default getRecipes;
