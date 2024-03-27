import React, { useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard'
import { axiosApi } from '../helper/axiosApi'
import { isUserLoggedIn } from '../helper/authFunctions'
import CustomLoader from '../components/CustomLoader'
import { useDispatch } from 'react-redux'
import { getProfileUser } from '../redux/auth/slice'

const Cart = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(10)
    const [cartListData, setcartListData] = useState()
    const [cartListError, setCartListError] = useState()
    const [removedCartData, setRemovedCartData] = useState()
    const dispatch = useDispatch()
    const fetchCartItem = async () => {
        setIsLoading(true)
        try {
            const cartsData = await axiosApi.get('/cart/get-cart-itemlist', {
                params: {
                    page,
                    limit
                }
            })
            setTimeout(() => {
                if (page == 1) {
                    setcartListData(cartsData?.data?.data)
                } else {
                    let updatedCartListData = { ...cartListData, results: [...cartListData.results, ...cartsData?.data?.data?.results] }
                    setcartListData(updatedCartListData)
                }
                setIsLoading(false)
            }, 500);
        } catch (error) {
            setIsLoading(false)
            setCartListError(error)
        }
    }

    useEffect(() => {
        fetchCartItem()
    }, [page])

    useEffect(() => {
        if (!isUserLoggedIn()) {
            window.location.assign('/login')
        }
    }, [])


    const removeProductFromCartApi = async (cartItemId) => {
        setIsLoading(true)
        try {
            const response = await axiosApi.delete(`cart/remove-from-cart/${cartItemId}`)
            setRemovedCartData({success:true, cartItemId})
            dispatch(getProfileUser())
            setTimeout(() => {
                setIsLoading(false)
                if (page===1) {
                    fetchCartItem()
                }else{
                    setPage(1)
                }
            }, 500);
        } catch (error) {
            setTimeout(() => {
                setIsLoading(false)
            }, 500);
        }
    }

    const updateCartList = (cartItemIds) =>{
        let tempCartListData = [...cartListData.results]
        let removedCartIndex = tempCartListData.findIndex(cart => cart.id === cartItemIds)
        tempCartListData.splice(removedCartIndex, 1)
        setcartListData({results:tempCartListData})
    }
    return (
        <>
            {
                isLoading &&
                <CustomLoader />
            }
            <div className='container px-6 mx-auto'>
                <h1 className='text-3xl font-semibold'>Cart Items <span className='!text-lg'>( Total {cartListData?.totalResults ?? 0} Results)</span></h1>
            </div>
            {!!cartListData?.results?.length
                ? <div className='container grid grid-cols-4 gap-6 px-4 py-10 mx-auto'>
                    {
                        cartListData?.results?.map((cartItem, i) => {
                            return (<ProductCard
                                type='cartProduct'
                                key={i}
                                productData={cartItem.product}
                                removeFromCartClick={() => removeProductFromCartApi(cartItem.id)}
                                user={cartItem.product.user}
                            />)
                        })
                    }
                    {(cartListData?.totalResults > cartListData?.results?.length) &&
                        <div className='flex items-center justify-center col-span-4 mb-20'>
                            <button onClick={(e) => setPage(page + 1)} className='btn-primary-outline font-semibold !rounded-full'>Load more</button>
                        </div>
                    }
                </div>
                : <p className='py-20 font-semibold text-center'>No data found!</p>
            }

        </>
    )
}

export default Cart