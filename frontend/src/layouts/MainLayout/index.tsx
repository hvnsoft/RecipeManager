import React, { ReactNode } from 'react';
import { Header, Footer } from '../../components';
import Container from '@mui/material/Container';

const MainLayout: React.FC<{
    children: ReactNode;
}> = ({ children }) => {

    return (
        <div>
            <Header />
            <Container
                maxWidth="xl"
                sx={{
                    minHeight: '80vh'
                }}
            >
                <main>{children}</main>
            </Container>
            <Footer />
        </div>
    );
};

export default MainLayout;