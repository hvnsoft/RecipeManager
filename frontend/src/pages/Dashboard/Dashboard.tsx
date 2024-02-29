import React from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Pagination from '@mui/material/Pagination';
import Typography from '@mui/material/Typography';
import { MainLayout } from '../../layouts';
import { Card, CreateModal, FilterCheckbox } from './components';
import { DashboardContextProvider, useDashboardContext } from '../../contexts/DashboardContext';
import { useMainContext } from '../../contexts/MainContext';
import { useGetRecipes } from '../../api/recipes/hooks';

const Dashboard: React.FC = () => {

    const { pageNumber, setPageNumber } = useDashboardContext();
    const { filterKeys } = useDashboardContext();
    const { searchKey } = useMainContext();
    const { data } = useGetRecipes({ pageNumber: pageNumber, title: searchKey, filter: filterKeys });

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => setPageNumber(value);

    return (
        <MainLayout>
            <Stack spacing={2} direction="row" sx={{ mt: 5, mb: 4 }}>
                <FilterCheckbox list={(data as any)?.ingredientList} />
                <Box sx={{ flexGrow: 1 }} />
                <Pagination count={(data as any)?.count} color="primary" size='large' onChange={handlePageChange} page={pageNumber} />
                <Box sx={{ flexGrow: 1 }} />
                <CreateModal />
            </Stack>
            {(data as any)?.count ?
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    {(data as any)?.recipes.map((recipe: any) => (
                        <Grid xs={4} sm={4} md={4} key={recipe.id}>
                            <Card id={recipe.id} title={recipe.title} instruction={recipe.instruction} />
                        </Grid>
                    ))}
                </Grid> :
                <Box display="flex" justifyContent="center" sx={{ m: 5 }}>
                    <Typography variant="h6" component="div">
                        There is no data.
                    </Typography>
                </Box>
            }
        </MainLayout>
    );
};

const DashboardWithContext: React.FC = () => {
    return (
        <DashboardContextProvider>
            <Dashboard />
        </DashboardContextProvider>
    );
};

export default DashboardWithContext;