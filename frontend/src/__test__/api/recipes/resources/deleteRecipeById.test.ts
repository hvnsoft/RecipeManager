import { deleteRecipeById } from '../../../../api/recipes/resources';
import { requestRecipe } from '../../../../api/recipes/requestRecipe';

jest.mock('../../../../api/recipes/requestRecipe', () => ({
    requestRecipe: {
        delete: jest.fn(),
    },
}));

describe('deleteRecipeById', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should call requestRecipe.delete with the correct URL', async () => {
        const recipeId = 123;
        await deleteRecipeById(recipeId);

        expect(requestRecipe.delete).toHaveBeenCalledWith(`/recipes/${recipeId}`);
    });
});
