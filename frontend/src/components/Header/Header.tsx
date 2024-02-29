import React from 'react';
import { useLocation } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Logo from './Logo';
import SearchBar from './SearchBar';

const Header: React.FC = () => {

    const pathname = useLocation().pathname;

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar>
                        <Logo />
                        {(pathname === '/') && <SearchBar />}
                    </Toolbar>
                </Container >
            </AppBar>
        </Box >
    );
}

export default Header;