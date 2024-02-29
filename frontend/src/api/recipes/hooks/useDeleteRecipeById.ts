import { useMutation, UseMutationResult } from 'react-query';
import { deleteRecipeById } from '../resources';
import { MsgResponse } from '../typesRecipe';

const useDeleteRecipeById = (): UseMutationResult<MsgResponse, Error, number> => {
    return useMutation<MsgResponse, Error, number>((params) => deleteRecipeById(params).then(response => response.data));
};

export default useDeleteRecipeById;