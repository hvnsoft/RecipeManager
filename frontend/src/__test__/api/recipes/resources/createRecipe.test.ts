import { createRecipe } from '../../../../api/recipes/resources';
import { requestRecipe } from '../../../../api/recipes/requestRecipe';

jest.mock('../../../../api/recipes/requestRecipe', () => ({
    requestRecipe: {
        post: jest.fn(),
    },
}));

describe('createRecipe', () => {

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should call requestRecipe.post with the correct URL and data', async () => {
        const mockRecipeData = {
            title: 'title',
            instruction: 'instruction',
            ingredients: 'a:5ml,b:10g'
        };
        const mockResponseData = { id: '123' };
        (requestRecipe.post as jest.Mock).mockResolvedValueOnce({ data: mockResponseData });

        await createRecipe(mockRecipeData);

        expect(requestRecipe.post).toHaveBeenCalledWith('/recipes', mockRecipeData);
    });

    it('should throw an error on failure', async () => {
        const mockRecipeData = {
            title: 'title',
            instruction: 'instruction',
            ingredients: 'a:5ml,b:10g,dfd'
        };
        const mockError = new Error('Request failed');
        (requestRecipe.post as jest.Mock).mockRejectedValueOnce(mockError);
        await expect(createRecipe(mockRecipeData)).rejects.toThrow(mockError);
    });
});
