import React from 'react'
import { loaderGif, mainLoaderGif } from '../assets/images'

const CustomLoader = () => {
  return (
    <div className='bg-black/60 z-[99999] w-screen h-screen fixed top-0 left-0 flex items-center justify-center'><img width={100} src={mainLoaderGif} alt="" /></div>
  )
}

export default CustomLoader