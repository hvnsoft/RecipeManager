import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useCreateRecipe } from '../../../../../api/recipes/hooks';

export interface CreateRecipeParams {
    title: string;
    instruction: string;
    ingredients: string;
}

const CreateForm: React.FC<{
    handleClose: () => void;
}> = ({ handleClose }) => {
    const [formData, setFormData] = useState<CreateRecipeParams>({
        title: '',
        instruction: '',
        ingredients: ''
    });

    const createRecipeMutation = useCreateRecipe();
    const navigate = useNavigate();
    const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const { data } = await createRecipeMutation.mutateAsync(formData);
            handleClose();
            navigate('/' + data);
        } catch (error) {
            alert(error)
        }
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
        <form onSubmit={handleFormSubmit}>
            <Box sx={{ width: '100%', my: 2 }}>
                <TextField
                    fullWidth
                    type='input'
                    id="title"
                    name="title"
                    label="Title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                />
            </Box>
            <Box sx={{ width: '100', my: 2 }}>
                <TextField
                    fullWidth
                    type='input'
                    id="instruction"
                    name="instruction"
                    label="Instruction"
                    multiline
                    rows={8}
                    value={formData.instruction}
                    onChange={handleInputChange}
                    required
                />
            </Box>
            <Box sx={{ width: '100', my: 2 }}>
                <TextField
                    fullWidth
                    type='input'
                    id="ingredients"
                    name="ingredients"
                    label="Ingredients"
                    placeholder='Ingredients and their quantities should be separated by a colon ":" and each pair should be separated by a comma. e.g. : salt:5g,sugar:10g, milk:200ml, beef : 300g'
                    multiline
                    rows={8}
                    value={formData.ingredients}
                    onChange={handleInputChange}
                    required
                />
            </Box>
            <Button variant="contained" type="submit">Submit</Button>
        </form>
    );
};

export default CreateForm;
