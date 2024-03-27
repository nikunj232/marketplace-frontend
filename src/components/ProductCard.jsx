import React, { useEffect } from 'react'
import { dummyProductPng } from '../assets/images/index'

const ProductCard = ({ productData, addToCartClick, type = 'product', removeFromCartClick, isAddedToCart, user }) => {
    return (
        <div className='hover:scale-[105%] transition-all duration-200 px-6 py-4 flex flex-col bg-white shadow-theme rounded-lg'>
            <div className='relative mb-4 rounded-sm min-h-[150px]'>
                <img className='max-h-[150px]' src={`${process.env.REACT_APP_API_ENDPOINT}upload/${productData.image}`} alt="" />
            </div>
            {/* <div className='mb-4 rounded-sm min-h-[150px]'>
                <img className='max-h-[150px] w-full' height={150} src={`${process.env.REACT_APP_API_ENDPOINT}upload/${productData?.image}` ?? dummyProductPng} alt="" />
            </div> */}
            <div className='flex items-start justify-between mb-2'>
                <p className='text-lg font-semibold'>{productData?.name}</p>
                <p className='text-xl font-bold'>-/{productData?.price}$</p>
            </div>
            <p className='mb-4 text-sm font-medium'>{productData?.description}</p>
            <div className='flex items-center justify-between mt-auto'>
                <div className='flex flex-col items-start justify-start gap-1 py-2'>
                    {/* {
                        type === 'cartProduct'?
                            <>
                                <span className='text-sm text-black'>by</span>
                                <span className='text-base font-semibold'>{productData?.user?.username}</span>
                            </>
                        :<>
                        </>
                    } */}
                    {user?.username &&
                        <>
                            <span className='text-sm text-black'>by</span>
                            <span className='text-base font-semibold'>{user?.username}</span>
                        </>
                    }
                </div>
                {
                    type === 'cartProduct'
                    && <button onClick={() => removeFromCartClick(productData.id)} className="px-3 py-2 text-sm font-bold bg-white border-2 rounded-lg border-primary text-primary" type="submit">Remove from Cart</button>
                }
                {
                    type !== 'cartProduct' && type !== 'myProduct' && !isAddedToCart
                    && <button onClick={() => addToCartClick(productData.id)} className="px-6 py-2 text-sm font-semibold text-white rounded-lg bg-primary" type="submit">Add to Cart</button>
                }
            </div>
        </div>
    )
}

export default ProductCard