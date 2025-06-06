import React from 'react'
import { assets } from '../../assets/assets'

const Companies = () => {
  return (
    <div className='pt-16'>
      <p className='text-base text-gray-500'>Trusted by learners from</p>
      <div className='flex flex-wrap items-center justify-center gap-6 md:gap-16 mt-4'>
        <img src={assets.microsoft_logo} alt="Microsoft Logo" className='w-20 md:w-28' />
                <img src={assets.microsoft_logo} alt="Microsoft Logo" className='w-24 h-24' />
        <img src={assets.walmart_logo} alt="walmart Logo" className='w-24 h-24' />
        <img src={assets.accenture_logo} alt="accenture Logo" className='w-24 h-24' />
        <img src={assets.paypal_logo} alt="paypal Logo" className='w-24 h-24' />
        <img src={assets.adobe_logo} alt="adobe Logo" className='w-24 h-24' />

      </div>
    </div>
  )
}

export default Companies
