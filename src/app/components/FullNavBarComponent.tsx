'use client'

import React from 'react'
import hamburg from '@/assets/images/boxHamburg.png'
import { propLoc } from '@/interfaces/interfaces'

const FullNavBarComponent = (props: propLoc) => {
    return (
        <div className='absolute top-[40px] left-[25px] w-44 h-[1000px] bg-[#B7B7B7] rounded-[30px]'>
            <img className='w-[140px] h-[130px]' src={hamburg.src} alt="Hamburger Menu" />
        </div>
    )
}

export default FullNavBarComponent
