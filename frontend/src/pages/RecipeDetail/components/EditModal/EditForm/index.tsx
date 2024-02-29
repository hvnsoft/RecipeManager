import React from 'react';
import { useUpdateRecipeById } from '../../../../../api/recipes/hooks';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const EditForm: React.FC<{
    data: {
        id: number;
        title: string;
        instruction: string;
        ingredients: { name: string; amount: string; }[];
    },
    handleClose: () => void;
    onRecipeUpdate: () => void;
}> = ({ data, handleClose, onRecipeUpdate }) => {

    const [formData, setFormData] = React.useState({
        id: data.id,
        title: data.title,
        instruction: data.instruction,
        ingredients: data.ingredients.map(ingredient => `${ingredient.name}: ${ingredient.amount}`).join(', ')
    });

    const updateRecipeById = useUpdateRecipeById();

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            await updateRecipeById.mutateAsync(formData);
            handleClose();
            onRecipeUpdate();
        } catch (error) {
            alert(error)

        }
    };

    return (
        <form onSubmit={handleFormSubmit}>
            <Box sx={{ width: '100%', my: 2 }}>
                <TextField
                    fullWidth
                    type='input'
                    id="outlined-multiline-static-title"
                    label="Title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                />
            </Box>
            <Box sx={{ width: '100', my: 2 }}>
                <TextField
                    fullWidth
                    type='input'
                    id="outlined-multiline-static-instruction"
                    label="Instruction"
                    multiline
                    rows={8}
                    name="instruction"
                    value={formData.instruction}
                    onChange={handleInputChange}
                    required
                />
            </Box>
            <Box sx={{ width: '100', my: 2 }}>
                <TextField
                    fullWidth
                    type='input'
                    id="outlined-multiline-static-ingredients"
                    label="Ingredients"
                    placeholder='Ingredients and their quantities should be separated by a colon ":" and each pair should be separated by a comma. e.g. : salt:5g,sugar:10g, milk:200ml, beef : 300g'
                    multiline
                    rows={8}
                    name="ingredients"
                    value={formData.ingredients}
                    onChange={handleInputChange}
                    required
                />
            </Box>
            <Button variant="contained" type="submit">Submit</Button>
        </form>
    );
}

export default EditForm;