export interface RecipeIO {
    id?: number,
    title: string,
    instruction: string,
    ingredients: { name: string; amount: string }[];
}