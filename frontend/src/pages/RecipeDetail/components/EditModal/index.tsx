import React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import Fab from '@mui/material/Fab';
import EditForm from './EditForm';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '70rem',
    height: '43rem',
    bgcolor: 'background.paper',
    border: '0.1rem solid rgba(25, 118, 210, 0.8)',
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
};

const EditModal: React.FC<{
    data: {
        id: number;
        title: string;
        instruction: string;
        ingredients: { name: string; amount: string; }[];
    },
    onRecipeUpdate: () => void;
}> = ({ data, onRecipeUpdate }) => {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <Fab color="primary" onClick={handleOpen} aria-label="edit">
                <EditIcon />
            </Fab>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={open}>
                    <Box sx={style}>
                        <Typography id="transition-modal-title" variant="h5" component="h2">
                            Edit current recipe
                        </Typography>
                        <EditForm data={data} handleClose={handleClose} onRecipeUpdate={onRecipeUpdate} />
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}

export default EditModal;