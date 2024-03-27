import React, { useEffect, useState } from 'react'
import { dummyProductPng } from '../assets/images/index'
import { axiosApi } from '../helper/axiosApi'
import ProfilePopup from '../components/ProfilePopup'
import { cartPng} from '../assets/images/index'
import ProductCard from '../components/ProductCard'
import { getProfileStatus, isUserLoggedIn } from '../helper/authFunctions'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addProductToCart } from '../redux/cart/slice'
import { getProfileUser } from '../redux/auth/slice'
import CustomLoader from '../components/CustomLoader'

const Home = () => {
  const [searchText, setSearchText] = useState('')
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)
  const [isLoading, setIsLoading] = useState(false)
  const [addProductCartData, setAddProductCartData] = useState()
  const [productsListData, setproductsListData] = useState()
  const [productsListError, setproductsListError] = useState()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {cartProductItemIds} = useSelector((store) => ({
    cartProductItemIds: store.authSlice.profileData.data?.cartItem
  }))
  const fetchProduct = async () => {
    setIsLoading(true)
    try {
      const productsData = await axiosApi.get('/products/get-product-list', {
        params:{
          search:searchText,
          page,
          limit
        }
      })

      setTimeout(() => {
        if (page==1) {
          setproductsListData(productsData.data.data)
        }else{
          let updatedProductListData = {...productsListData, results: [...productsListData.results, ...productsData?.data?.data?.results]}
          setproductsListData(updatedProductListData)
        }
        setIsLoading(false)
      }, 500);
    } catch (error) {
      setIsLoading(false)
      setproductsListError(error)
    }
  }

  const addToCart = (productId) => {
    if (!isUserLoggedIn()) {
      navigate('/login')
      return;
    }else{
      dispatch(addProductToCart(productId))
    }
  }

  const addProductToCartApi = async (productId) => {
    setIsLoading(true)
    try {
      const response = await axiosApi.post(`cart/add-to-cart` , {productId})
      setAddProductCartData(response.data?.data)
      dispatch(getProfileUser())
      updateProductList(productId)
      setTimeout(() => {
        setIsLoading(false)
      }, 500);
    } catch (error) {
      setTimeout(() => {
        setIsLoading(false)
      }, 500);
    }
  }

  const updateProductList = (productId) =>{
    let tempProductListData = [...productsListData.results]
    let addedToCartProductIndex = tempProductListData.findIndex(product => product.id === productId)
    tempProductListData[addedToCartProductIndex] = {...tempProductListData[addedToCartProductIndex], isAddedCart:true}
  }
  useEffect(() => {
    fetchProduct()
  }, [page, searchText])

  useEffect(() => {
    setPage(1)
  }, [searchText])

  return (
    <>
      {isLoading && <CustomLoader/>}
      <div className='relative mx-auto overflow-y-auto'>
        <div className='container flex items-center justify-between px-6 mx-auto'>
          <h5 className='text-3xl font-semibold'>Products <span className='text-lg'>(Total {productsListData?.totalResults ?? 0} Results)</span></h5>
          <div className="relative max-w-xs transition-all bg-white border-2 rounded-lg shadow-theme hover:shadow-lg focus:border-dark-gray border-gray">
            <input
              onChange={(e) => {setSearchText(e.currentTarget.value); setPage(1)}}
              placeholder='Search'
              className="w-full px-4 py-2 bg-white border-none rounded-lg border-gray"
              id="usernameField"
              type="search"
            />
          </div>
        </div>
        {!!productsListData?.results?.length
          ?<>
            <div className='container grid grid-cols-4 gap-8 px-4 py-10 mx-auto overflow-y-auto'>
              {
                productsListData?.results.map((product, i) => {
                  return (
                    <ProductCard addToCartClick={addProductToCartApi} key={i} productData={product} user={product.user} isAddedToCart={!cartProductItemIds ? false : cartProductItemIds?.includes(product.id)}/>
                  )
                })
              }
              {productsListData?.totalPages > productsListData?.page &&
                <div className='flex items-center justify-center col-span-4 mb-20'>
                  <button onClick={(e) => setPage(page+1)} className='btn-primary-outline font-semibold !rounded-full'>Load more</button>
                </div>
              }
            </div>
          </>
          :<p className='py-20 font-semibold text-center'>No data found!</p>
        }
      </div>
    </>
  )
}

export default Home