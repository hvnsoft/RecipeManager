import {
	Router,
	Request,
	Response
} from "express";
import mainController from "../../controllers";

export class RecipeRouter {	
	router: Router;

	constructor() {
		this.router = Router();
		this.init();
	}

	init() {
		this.router.get("/", this.getRecipes);
		this.router.get("/:id", this.getRecipeById);
		this.router.post("/", this.createRecipe);
		this.router.put("/:id", this.updateRecipeById);
		this.router.delete("/:id", this.deleteRecipeById);
	}

	async getRecipes(req: Request, res: Response) {
		await mainController.recipeController.getRecipes(req, res);
	}

	async getRecipeById(req: Request, res: Response) {
		await mainController.recipeController.getRecipeById(req, res);
	}

	async createRecipe(req: Request, res: Response) {
		await mainController.recipeController.createRecipe(req, res);
	}

	async updateRecipeById(req: Request, res: Response) {
		await mainController.recipeController.updateRecipeById(req, res);
	}

	async deleteRecipeById(req: Request, res: Response) {
		await mainController.recipeController.deleteRecipeById(req, res);
	}
}