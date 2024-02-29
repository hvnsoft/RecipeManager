import { requestRecipe } from '../requestRecipe';
import { MsgResponse } from '../typesRecipe';

const deleteRecipeById = (recipeId: number) =>
    requestRecipe.delete<MsgResponse>(`/recipes/${recipeId}`);

export default deleteRecipeById;