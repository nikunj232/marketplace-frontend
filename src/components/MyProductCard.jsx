import React, { useEffect, useState } from 'react'
import { deleteSvg, dummyProductPng } from '../assets/images/index'
import DeleteProductModal from './DeleteProductModal'
import { useDispatch } from 'react-redux'
import { deleteProduct } from '../redux/product/slice'

const MyProductCard = ({productData, handleDeleteClick}) => {
    const dispatch = useDispatch()

    const deleteProductItem = () => {
        if (productData.id) {
            handleDeleteClick(productData.id)
            // dispatch(deleteProduct(productData.id))
        }
    }

    return (
        <div className='hover:scale-[105%] transition-all duration-200 px-6 py-3 flex flex-col bg-white shadow-theme rounded-lg'>
            <div className='relative mb-4 rounded-sm min-h-[150px]'>
                <img className='max-h-[150px]' src={`${process.env.REACT_APP_API_ENDPOINT}upload/${productData.image}`} alt="" />
            </div>
            <div className='flex items-start justify-between mb-2'>
                <p className='text-lg font-semibold'>{productData.name}</p>
                <p className='text-xl font-bold'>-/{productData.price}$</p>
            </div>
            <p className='mb-4 text-sm font-medium'>{productData.description}</p>
            <div className='flex items-center justify-end mt-auto'>
                <button onClick={deleteProductItem} className="px-2 py-2 text-sm font-semibold border-2 rounded-lg bg-red border-red text-primary">
                    <img className='invert-[42] sepia-[93] saturate-[1352%] hue-rotate-[87deg] brightness-[119] contrast-[119]' width={25} src={deleteSvg} alt="" />
                </button>
            </div>
        </div>
    )
}

export default MyProductCard