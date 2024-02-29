import { requestRecipe } from '../requestRecipe';
import { RecipeResponse } from '../typesRecipe';

const getRecipeById = (recipeId: number) =>
    requestRecipe.get<RecipeResponse>(`/recipes/${recipeId}`);

export default getRecipeById;