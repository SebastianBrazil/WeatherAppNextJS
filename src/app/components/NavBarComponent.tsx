'use client'

import React from 'react'
import hamburg from '@/assets/images/hambib.png'

const NavBarComponent = () => {
    return (
        <div className='z-20 absolute top-[40px] left-[25px] w-44 h-40 bg-[#B7B7B7] rounded-[30px] grid place-items-center'>
            <img className='w-[140px] h-[130px]' src={hamburg.src} alt="Hamburger Menu" />
        </div>
    )
}

export default NavBarComponent
