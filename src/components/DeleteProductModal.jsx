import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { deleteSvg } from '../assets/images';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  boxShadow: 24,
  padding: "20px 25px",
};

function DeleteProductModal(handleDeleteClick, handleDeleteProduct) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
        {/* <button onClick={handleOpen} className='px-5 py-2 font-semibold text-white rounded-lg bg-primary'>Add Product</button> */}
        <button onClick={(e) => { handleOpen(); handleDeleteClick(e);}} className="px-2 py-2 text-sm font-semibold border-2 rounded-lg bg-red border-red text-primary" type="button">
          <img className='invert-[42] sepia-[93] saturate-[1352%] hue-rotate-[87deg] brightness-[119] contrast-[119]' width={25} src={deleteSvg} alt="" />
        </button>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>

            <Typography className='mb-4 text-xl font-bold border-b-2 border-b-gray' marginBottom={'10px'} fontWeight={600} id="modal-modal-title" variant="h5" component="h2">
              Delete Product
            </Typography>
            <Typography className='mb-8 text-lg font-medium'  marginBottom={'40px'} fontWeight={500} id="modal-modal-title" variant="body1" component="p">
              Are you sure you want to delete this product ?
            </Typography>
            <div className='flex items-center justify-end gap-4'>
                <button type='button' className='btn-danger-outline' onClick={handleClose}>Cancel</button>
                <button type='button' onClick={(e) => handleDeleteProduct()} className='btn-danger'>Delete</button>
            </div>
            </Box>
        </Modal>
    </div>
  );
}

export default DeleteProductModal