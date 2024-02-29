import React from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const OutlinedCard: React.FC<{
    id: number;
    title: string;
    instruction: string;
}> = ({ id, title, instruction }) => {
    return (
        <Box>
            <Card variant="outlined" sx={{ p: 1.5 }}>
                <CardContent>
                    <Typography variant="h5" component="div" sx={{ height: '2.25rem', overflow: 'hidden' }}>
                        {title}
                    </Typography>
                    <Typography variant="body2" sx={{ height: '6rem', overflow: 'hidden' }}>
                        {instruction.substring(0, 300) + "..."}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Link to={`/${id}`}><Button size="small">Learn More</Button></Link>
                </CardActions>
            </Card>
        </Box>
    );
}

export default OutlinedCard;