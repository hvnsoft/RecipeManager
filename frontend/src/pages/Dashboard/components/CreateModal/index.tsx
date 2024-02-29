import React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import CreateForm from './CreateForm';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

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

const CreateModal: React.FC = () => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <Fab color="primary" onClick={handleOpen} aria-label="add">
                <AddIcon />
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
                            Create a new recipe here.
                        </Typography>
                        <CreateForm handleClose={handleClose} />
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}

export default CreateModal;