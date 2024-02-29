import { getRecipeById } from '../../../../api/recipes/resources';
import { requestRecipe } from '../../../../api/recipes/requestRecipe';

jest.mock('../../../../api/recipes/requestRecipe', () => ({
    requestRecipe: {
        get: jest.fn(),
    },
}));

describe('getRecipeById', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should call requestRecipe.get with the correct URL', async () => {
        const recipeId = 123;
        await getRecipeById(recipeId);

        expect(requestRecipe.get).toHaveBeenCalledWith(`/recipes/${recipeId}`);
    });
});
