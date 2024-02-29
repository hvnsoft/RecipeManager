import React from 'react';
import { styled } from '@mui/material/styles';

const Div = styled('div')(({ theme }) => ({
    ...theme.typography.button,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2),
    borderTop: `0.1rem solid ${theme.palette.primary.main}`,
    width: '100%',
    textAlign: 'center',
    marginTop: '5rem'
}));

const Footer: React.FC = () => {
    return <Div>{"Recipe Manager by Hoai Vu Nguyen @2024"}</Div>;
}

export default Footer;
