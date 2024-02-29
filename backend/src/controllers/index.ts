import { RecipeController } from './recipe.controller/recipe.controller';

class MainController {
    recipeController: RecipeController;

    constructor() {
        this.recipeController = new RecipeController;
    }
}

const mainController = new MainController();
export default mainController;