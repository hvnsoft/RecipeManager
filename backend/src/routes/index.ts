import { Router } from 'express';
import { RecipeRouter } from './recipe.route/recipe.route';

class MainRouter {
    router: Router;
    recipeRouter: Router;

    constructor() {
        this.router = Router();
        this.recipeRouter = new RecipeRouter().router;
        this.init();
    }

    init() {
        this.router.use('/recipes', this.recipeRouter);
    }
}

const mainRouter = new MainRouter().router;
export default mainRouter;