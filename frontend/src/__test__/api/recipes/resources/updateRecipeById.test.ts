import { updateRecipeById } from '../../../../api/recipes/resources';
import { requestRecipe } from '../../../../api/recipes/requestRecipe';

jest.mock('../../../../api/recipes/requestRecipe', () => ({
    requestRecipe: {
        put: jest.fn(),
    },
}));

describe('updateRecipeById', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should call requestRecipe.put with the correct URL and data', async () => {
        const mockRecipeData = {
            id: 123,
            title: 'title',
            instruction: 'instruction',
            ingredients: 'a:5ml,b:10g'
        };
        await updateRecipeById(mockRecipeData);

        expect(requestRecipe.put).toHaveBeenCalledWith(`/recipes/${mockRecipeData.id}`, mockRecipeData);
    });

});
