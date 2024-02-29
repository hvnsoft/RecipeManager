import mainController from '../../controllers';

describe('MainController', () => {
    
    it('should create an instance of MainController', () => {
        expect(mainController).toBeDefined();
    });

    it('should have an instance of RecipeController', () => {
        expect(mainController.recipeController).toBeDefined();
    });
});