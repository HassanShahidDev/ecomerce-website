import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {

  return (
    <div>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
       <div>
        <img src={assets.logo} className='md-5 w-32' alt="" />
       <p className='w-full md:w-2/3 text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum laborum deserunt rerum debitis perspiciatis! Fuga, perspiciatis illum. Nisi ratione reiciendis error, odio laborum reprehenderit eum rerum, corporis, sapiente impedit nulla.</p>
       </div>


       <div>
        <p className='text-xl font-medium mb-5'>COMPANY</p>
        <ul className='flex flex-col gap-1 text-gray-600' >
           <li>Home</li>
           <li>About</li>
           <li>Delivery</li>
           <li>PRIVACYPOLICY</li>
        </ul>
       </div>

    <div>
        <p className='text-xl font-meduium mb-5'>GET IN TOUCH </p>
        <ul  className='flex flex-col gap-1 text-gray-600'>
        <li>+92 3001839292</li>
        <li> hassanshahid778866@gmail.com </li>
        </ul>
    </div>

      </div>

      <div>
        <hr />
        <p className='py-5 text-sm text-center'>Copyright 2025@ forever.com - All rights reserved.</p>
      </div>
    </div>
  )
}

export default Footer
