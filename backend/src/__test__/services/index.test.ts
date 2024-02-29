import { RecipeService } from '../../services/recipe.service/recipe.service';
import MainService from '../../services';

// Mock RecipeService class
jest.mock('../../services/recipe.service/recipe.service', () => {
    return {
        RecipeService: jest.fn().mockImplementation(() => {
            return {
                findIngredientList: jest.fn(),
                findAll: jest.fn(),
            };
        }),
    };
});

describe('MainService', () => {

    let mainService: typeof MainService;
    let mockRecipeService: RecipeService;

    beforeEach(() => {
        // Initialize MainService and the mocked RecipeService
        mainService = MainService;
        mockRecipeService = new RecipeService() as jest.Mocked<RecipeService>;
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should be defined', () => {
        expect(mainService).toBeDefined();
    });

});
