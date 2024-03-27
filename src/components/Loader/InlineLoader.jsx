import React from 'react'
import { inlineLoaderPrimaryGif, inlineLoaderWhiteGif } from '../../assets/images'

const InlineLoader = ({color='white'}) => {
  return (
    <>
        {
            color ==="white"&&
            <div>
                <img src={inlineLoaderWhiteGif} alt="inlineLoader" />
            </div>
        }
        {
            color ==="primary"&&
            <div>
                <img src={inlineLoaderPrimaryGif} alt="inlineLoader" />
            </div>
        }
    </>
  )
}

export default InlineLoader