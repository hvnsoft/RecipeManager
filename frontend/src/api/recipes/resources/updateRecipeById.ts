import { requestRecipe } from '../requestRecipe';
import { UpdateRecipeParams, IdResponse } from '../typesRecipe';

const updateRecipeById = (recipeData: UpdateRecipeParams) =>
    requestRecipe.put<IdResponse>(`/recipes/${recipeData.id}`, recipeData);

export default updateRecipeById;