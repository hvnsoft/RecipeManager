import React from 'react';
import { useLocation } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import { MainLayout } from '../../layouts';
import { EditModal, DeleteModal, IngredientTable } from './components'
import { useGetRecipeById } from '../../api/recipes/hooks';

const RecipeDetail: React.FC = () => {
    const location = useLocation();
    const id = Number(location.pathname.slice(1));
    const { data, refetch } = useGetRecipeById(id); // Destructure the refetch function

    const handleRecipeUpdate = async () => {
        await refetch(); // Refetch the recipe data
    };

    return (
        <MainLayout>
            {data ? (
                <React.Fragment>
                    <Stack spacing={2} direction="row" sx={{ my: 5 }}>
                        <Typography variant="h3" gutterBottom sx={{ textShadow: '0.15rem 0.15rem 0.3rem rgba(0, 0, 0, 0.5)' }}>
                            {data.title}
                        </Typography>
                        <Box sx={{ flexGrow: 1 }} />
                        <EditModal data={data} onRecipeUpdate={handleRecipeUpdate} /> {/* Pass the callback function */}
                        <DeleteModal id={id} />
                    </Stack>
                    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                        <Grid xs={4} sm={4} md={5} key={0}>
                            {data.ingredients && <IngredientTable lists={data.ingredients} />}
                        </Grid>
                        <Grid xs={4} sm={4} md={7} key={1}>
                            <Typography variant="h6" gutterBottom>
                                {data.instruction}
                            </Typography>
                        </Grid>
                    </Grid>
                </React.Fragment>
            ) : (
                <Box display="flex" justifyContent="center" sx={{ m: 5 }}>
                    <Typography variant="h6" component="div">
                        Unfortunately, there isn't a recipe associated with the ID number {id}.
                    </Typography>
                </Box>
            )}
        </MainLayout>
    );
}

export default RecipeDetail;