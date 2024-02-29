import { RecipeService } from './recipe.service/recipe.service';

class MainService {
    recipeService: RecipeService;

    constructor() {
        this.recipeService = new RecipeService();
    }
}

const mainService = new MainService();
export default mainService;