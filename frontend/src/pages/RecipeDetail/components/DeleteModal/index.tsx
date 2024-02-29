import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Fab from '@mui/material/Fab';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDeleteRecipeById } from '../../../../api/recipes/hooks';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '0.1rem solid rgb(156, 39, 176)',
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
};

const DeleteModal: React.FC<{
    id: number
}> = ({ id }) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const navigate = useNavigate();
    const deleteRecipeMutation = useDeleteRecipeById();

    const handleDelete = async () => {
        try {
            const { msg } = await deleteRecipeMutation.mutateAsync(id);
            handleClose();
            navigate('/');
            setTimeout(()=>{
                alert(msg);
            },200);
        } catch (error) {
            handleClose();
            setTimeout(()=>{
                alert(error);
            },200);
        }
    };

    return (
        <div>
            <Fab color="secondary" onClick={handleOpen} aria-label="edit">
                <DeleteIcon />
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
                            Delete
                        </Typography>
                        <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                            Are you going to delete current recipe?
                            <br />
                            Current recipe will be deleted permanently.
                        </Typography>
                        <Button variant="contained" color="secondary" onClick={handleDelete} sx={{ mt: 4 }}>Delete</Button>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}

export default DeleteModal;