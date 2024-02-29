import { useQuery, UseQueryResult } from 'react-query';
import { getRecipeById } from '../resources';
import { Recipe } from '../typesRecipe';

const useGetRecipeById = (recipeId: number): UseQueryResult<Recipe, Error> => {
    return useQuery(['recipes', recipeId], () => getRecipeById(recipeId).then(response => response.data.data));
};

export default useGetRecipeById;