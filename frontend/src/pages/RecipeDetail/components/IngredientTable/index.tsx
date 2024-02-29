import React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: '1rem',
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': { backgroundColor: theme.palette.action.hover },
    '&:last-child td, &:last-child th': { border: 0 },
}));


const IngredientTable: React.FC<{
    lists: {
        name: string;
        amount: string;
    }[];
}> = ({ lists }) => {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ width: '100%' }} size='small' aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell align="center">Ingredient</StyledTableCell>
                        <StyledTableCell align="center">Amount</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {lists.map(list => (
                        <StyledTableRow key={list.name}>
                            <StyledTableCell align="center" component="th" scope="row">{list.name}</StyledTableCell>
                            <StyledTableCell align="center">{list.amount}</StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default IngredientTable;