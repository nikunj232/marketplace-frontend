import React, { useEffect, useState } from 'react'
import ProductCard from '../../components/ProductCard'
import MyProductCard from '../../components/MyProductCard'
import CustomLoader from '../../components/CustomLoader'
import CreateProductModal from '../../components/CreateProductModal'
import { useDispatch, useSelector } from 'react-redux'
import { deleteProduct, getMyProduct, setProductState } from '../../redux/product/slice'
import { Box, Modal, Typography } from '@mui/material'
import { isUserLoggedIn } from '../../helper/authFunctions'
import { getProfileUser } from '../../redux/auth/slice.js'


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

const MyProduct = () => {

    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(10)
    const [isDeleteActive, setIsDeleteActive] = useState(false)
    const [deleteProductId, setDeleteProductId] = useState()

    const dispatch = useDispatch()
    const { addProductLoading, addProductData, isMyProductLoading, myProductData, myProductError, deleteProductLoading, deleteProductData, deleteProductError } = useSelector((store) => ({
        isMyProductLoading: store.productSlice.myProductData.loading,
        myProductData: store.productSlice.myProductData.data,
        myProductError: store.productSlice.myProductData.error,
        addProductLoading: store.productSlice.addProductData.loading,
        addProductData: store.productSlice.addProductData.data,
        deleteProductLoading: store.productSlice.deleteProductData?.loading,
        deleteProductData: store.productSlice.deleteProductData?.data,
        deleteProductError: store.productSlice.deleteProductData?.error
    }))

    useEffect(() => {
        setIsDeleteActive(false)
    }, [deleteProductData])

    const deleteProductItem = () => {
        if (deleteProductId) {
            dispatch(deleteProduct(deleteProductId))
        }
    }

    const handleDeletModalClose = () => {
        setIsDeleteActive(false)
    }
    const handleDeletModalOpen = () => {
        setIsDeleteActive(true)
    }
    useEffect(() => {
        if (page > 0) {
            dispatch(getMyProduct({ page, limit }))
        }
    }, [page, limit, addProductData])

    const handleProductAdded = () => {
        if (page==1) {
            dispatch(getMyProduct({ page, limit }))
        }else{
            setPage(1)
        }
    }
    const handleProductDeleted = () => {
        if (page===1) {
            dispatch(getMyProduct({ page, limit }))
        }else{
            setPage(1)
        }
    }

    useEffect(() => {
        if (!isUserLoggedIn()) {
            window.location.assign('/login')
        }
    }, [])

    useEffect(() => {
        if (deleteProductData && !deleteProductLoading) {
            handleDeletModalClose()
            setPage(1)
            handleProductAdded()
            dispatch(getProfileUser())
        }
    }, [deleteProductData, deleteProductLoading])

    return (
        <>
            {
                (isMyProductLoading || deleteProductLoading)
                && <CustomLoader />
            }
            <div className='container flex items-center justify-between px-6 mx-auto'>
                <h1 className='text-3xl font-semibold'>My Products <span className='text-lg'>(Total {myProductData?.totalResult ?? 0} Results)</span></h1>
                <CreateProductModal setPage={setPage} onProductAdded={handleProductAdded} />
            </div>
            <div className='container grid grid-cols-4 gap-8 px-4 py-10 mx-auto'>
                {!!myProductData?.results?.length
                    ?myProductData?.results?.map((product, i) => {
                        return (<MyProductCard type='myProduct' key={i} handleDeleteClick={(id) => {handleDeletModalOpen(); setDeleteProductId(id)}} productData={product} />)
                    })
                    :<div className='col-span-4 py-6 text-lg'><p className='w-full text-center'>No Data Found!</p></div>
                }
                {myProductData?.totalPages > myProductData?.page &&
                    <div className='flex items-center justify-center col-span-4 mb-20'>
                        <button onClick={(e) => setPage(page+1)} className='btn-primary-outline font-semibold !rounded-full'>Load more</button>
                    </div>
                }
            </div>
            <Modal
                open={isDeleteActive}
                onClose={handleDeletModalClose}
                aria-labelledby="delete-product"
                onBackdropClick={(e) => e.preventDefault}
                aria-describedby="delete-product-byid"
            >
                <Box sx={style}>

                    <Typography className='pb-2 mb-8 text-xl font-bold border-b-2 border-b-dark-gray/50' marginBottom={'10px'} fontWeight={600} id="modal-modal-title" variant="h5" component="h2">
                        Delete Product
                    </Typography>
                    <Typography className='mb-8 text-lg font-medium' marginBottom={'40px'} fontWeight={500} id="modal-modal-title" variant="body1" component="p">
                        Are you sure you want to delete this product ?
                    </Typography>
                    <div className='flex items-center justify-end gap-4'>
                        <button type='button' className='btn-danger-outline' onClick={handleDeletModalClose}>Cancel</button>
                        <button type='button' onClick={(e) => deleteProductItem()} className='btn-danger'>Delete</button>
                    </div>
                </Box>
            </Modal>
        </>
    )
}

export default MyProduct