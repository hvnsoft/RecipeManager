import React from 'react';
import { Dashboard, RecipeDetail } from '../../pages';
import { createBrowserRouter } from "react-router-dom";

const RootRouter = createBrowserRouter([
    {
        path: '/',
        element: <Dashboard />,
    }, {
        path: ':id',
        element: <RecipeDetail />,
    },
]);

export default RootRouter;
