import React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { useDashboardContext } from '../../../../contexts/DashboardContext';

const ITEM_HEIGHT = 30;
const ITEM_PADDING_TOP = 6;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 15.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const FilterCheckbox: React.FC<{
    list: string[]
}> = ({ list }) => {
    const { filterKeys, setFilterKeys, setPageNumber } = useDashboardContext();
    
    const handleChange = (event: SelectChangeEvent<typeof filterKeys>) => {
        const {
            target: { value },
        } = event;
        setFilterKeys(
            typeof value === 'string' ? value.split(',') : value,
        );
        setPageNumber(1);
    };

    return (
        <div>
            <FormControl sx={{ m: 0, width: 250 }} size="small">
                <InputLabel id="demo-multiple-checkbox-label">Ingredients</InputLabel>
                <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    multiple
                    value={filterKeys}
                    onChange={handleChange}
                    input={<OutlinedInput label="Ingredients" />}
                    renderValue={(selected) => selected.join(', ')}
                    MenuProps={MenuProps}
                >
                    {list?.map((name) => (
                        <MenuItem key={name} value={name}>
                            <Checkbox checked={filterKeys.indexOf(name) > -1} />
                            <ListItemText primary={name} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}

export default FilterCheckbox;