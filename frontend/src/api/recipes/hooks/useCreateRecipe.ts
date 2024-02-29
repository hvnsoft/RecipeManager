import { useMutation, UseMutationResult } from 'react-query';
import { createRecipe } from '../resources';
import { CreateRecipeParams, IdResponse } from '../typesRecipe';

const useCreateRecipe = (): UseMutationResult<IdResponse, Error, CreateRecipeParams> => {
    return useMutation<IdResponse, Error, CreateRecipeParams>((params) => createRecipe(params).then(response => response.data));
};

export default useCreateRecipe;
