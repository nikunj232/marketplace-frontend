import React, {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct } from '../redux/product/slice';
import { cancelSvg } from '../assets/images';
import CustomLoader from './CustomLoader';

const style = {
  position: 'absolute',
  top: '50%',
  borderRadius:"15px",
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  boxShadow: 24,
  padding: "20px 25px",
};


const addProductValidationSchema = Yup.object().shape({
  name: Yup.string().trim().min(3, "Name should be minimum 3 character").max(50, "Name should be maximum 50 character").required(),
  description: Yup.string().trim().min(10, "Description should be minimum 10 character").max(80, "Description should be maximum 80 character").required(),
  price: Yup.number().min(2, "Price should be minimum 2$"),
  image: Yup.mixed().required(),
})
function CreateProductModal({setPage, onProductAdded}) {
  const [open, setOpen] = useState(false);
  const [selectedProductImage, setSelectedProductImage] = useState();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch();

  const [formikState, setFormikState] = React.useState({
    name: '',
    description: '',
    price: 0,
    image: null
  })

  useEffect(() => {
    if (!open) {
      Object.keys(formikState).map(key => {
        setFieldValue(key, formikState[key])
        setFieldTouched(key, false)
      })
    }
  }, [open])

  const {addProductLoading,addProductData } = useSelector((store) => ({
    addProductLoading: store.productSlice?.addProductData?.loading,
    addProductData: store.productSlice?.addProductData?.data
  }))
  const {
    values,
    errors,
    dirty,
    touched,
    handleChange,
    handleSubmit,
    handleBlur,
    setFieldValue,
    setFieldTouched
  } = useFormik({
    initialValues: formikState,
    validationSchema: addProductValidationSchema,
    enableReinitialize:true,
    onSubmit: (data, { resetForm }) => {addProductPost(data, resetForm)}
  })

  const addProductPost = (data, resetForm) => {
    setPage(0)
    let addProductFormedData = new FormData()

    Object.keys(data).map(key => {
      addProductFormedData.append(key, data[key])
    })
    dispatch(addProduct(addProductFormedData))
    resetForm()
  }

  useEffect(() => {
    if (values.image) {
      setSelectedProductImage(URL.createObjectURL(values.image))
    }
  }, [values.image])

  useEffect(() => {
    if (addProductData && !addProductLoading) {
      onProductAdded()
      setPage(1)
      handleClose()
    }
  }, [addProductData, addProductLoading])

  return (
    <div>
      {
        (addProductLoading)&&
        <CustomLoader/>
      }
      <button onClick={handleOpen} className='px-5 py-2 font-semibold text-white rounded-lg bg-primary'>Add Product</button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>

          <Typography className='pb-2 text-xl font-bold border-b-2 border-dark-gray/50' fontWeight={600} id="modal-modal-title" variant="h5" component="h2">
            Add Product
          </Typography>
          <form className='mt-6'>
            <div className='mb-6'>
              <div className="mb-4">
                <label className="block font-medium text-md" htmlFor="emailField">
                  Name
                </label>
                <div className="relative max-w-xs border-2 rounded-lg focus:border-dark-gray border-gray">
                  <input
                    name="name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                    className="w-full px-4 py-2 text-sm border-none rounded-lg border-gray"
                    id="nameField"
                    type="text"
                    placeholder='Pease enter product name'
                  />
                </div>
                {
                  touched.name &&
                  <p className="text-sm text-red">{errors.name}</p>
                }
              </div>
              <div className="mb-4">
                <label className="block font-medium text-md" htmlFor="priceField">
                  Price
                </label>
                <div className="relative max-w-xs border-2 rounded-lg focus:border-dark-gray border-gray">
                  <input
                    name="price"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.price}
                    className="w-full px-4 py-2 text-sm border-none rounded-lg border-gray"
                    id="priceField"
                    min={0}
                    type="number"
                    placeholder='Pease enter product price'
                  />
                </div>
                {
                  touched.price &&
                  <p className="text-sm text-red">{errors.price}</p>
                }
              </div>
              <div className="mb-4">
                <label className="block font-medium text-md" htmlFor="descriptionField">
                  Description
                </label>
                <div className="relative max-w-xs border-2 rounded-lg focus:border-dark-gray border-gray">
                  <input
                    name="description"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.description}
                    className="w-full px-4 py-2 text-sm border-none rounded-lg border-gray"
                    id="descriptionField"
                    type="text"
                    placeholder='Pease enter product description'
                  />
                </div>
                {
                  touched.description &&
                  <p className="text-sm text-red">{errors.description}</p>
                }
              </div>
              <div className="mb-4">
                <label className="block font-medium text-md" htmlFor="descriptionField">
                  Product Image
                </label>
                <div className="flex items-center justify-start px-2 relative focus:border-dark-gray  min-h-[100px] max-w-xs border-2 border-gray rounded-lg">
                  <input
                    name="image"
                    onChange={(e) => {setFieldValue('image', e.currentTarget.files[0])}}
                    onBlur={handleBlur}
                    className="w-full h-full z-[999] absolute top-0 left-0 opacity-0 border-none px-4 py-2 border-gray rounded-lg"
                    id="descriptionField"
                    type="file"

                    // value={values.image}
                    accept="image/*"
                    placeholder='Drop your product image here'
                  />
                  {values.image
                    ? <div className='relative mx-auto'>
                      {/* <button onClick={() => setFieldValue('image', '')} className='absolute top-2 -right-2'><img width={20} src={cancelSvg} alt="" /></button> */}
                      <img
                        src={selectedProductImage}
                        alt="Preview"
                        className="mx-auto mt-4"
                        style={{ maxWidth: '200px', maxHeight: '200px' }}
                      />
                    </div>
                    : <p className='text-sm font-medium text-dark-gray'>Drop your product image here</p>
                  }
                </div>
                <div className="mt-4">
                </div>
                {
                  touched.image &&
                  <p className="text-sm text-red">{errors.image}</p>
                }
              </div>
            </div>
            <div className='flex items-center justify-end gap-4'>
              <button type='button' className='btn-primary-outline' onClick={handleClose}>Cancel</button>
              <button type="submit" onClick={handleSubmit} className='btn-primary'>Add</button>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
}

export default CreateProductModal