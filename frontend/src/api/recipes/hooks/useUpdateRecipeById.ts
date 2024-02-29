import { useMutation, UseMutationResult } from 'react-query';
import { updateRecipeById } from '../resources';
import { UpdateRecipeParams, IdResponse } from '../typesRecipe';

const useUpdateRecipeById = (): UseMutationResult<IdResponse, Error, UpdateRecipeParams> => {
    return useMutation<IdResponse, Error, UpdateRecipeParams>((params) => updateRecipeById(params).then(response => response.data));
};

export default useUpdateRecipeById;