import React from 'react';
import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from 'react-query';
import { RootRouter } from "./routes";
import { MainContextProvider } from './contexts/MainContext';

const queryClient = new QueryClient();

export default function App() {
  return (
    <MainContextProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={RootRouter} />
      </QueryClientProvider>
    </MainContextProvider>
  );
}