import { useQuery, UseQueryOptions, UseQueryResult } from 'react-query';
import { getRecipes } from '../resources';
import { GetRecipesParams, RecipeListResponse } from '../typesRecipe';

const useGetRecipes = (
    params: GetRecipesParams,
    options?: Omit<UseQueryOptions<RecipeListResponse, Error>, "queryKey" | "queryFn">
): UseQueryResult<RecipeListResponse, Error> => {
    return useQuery<RecipeListResponse, Error>(
        ['recipes', params],
        async () => {
            const response = await getRecipes(params);
            return response.data;
        },
        options
    );
};

export default useGetRecipes;
