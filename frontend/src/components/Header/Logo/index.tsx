import React from 'react';
import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';

const Logo: React.FC = () => {
    return (
        <Link to='/' style={{
            textDecoration: 'none',
            color:'white'
        }}>
            <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ cursor: 'pointer', display: { xs: 'none', sm: 'block' } }}
            >
                LOGO
            </Typography>
        </Link >
    );
}

export default Logo;