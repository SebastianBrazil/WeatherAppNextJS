'use client'

import React from 'react'
import hamburg from '@/assets/images/hambib.png'
import star from '@/assets/images/stare.png'
import fullStar from '@/assets/images/stareye.png'
import fTemp from '@/assets/images/fff.png'
import cTemp from '@/assets/images/ccc.png'
import upArrowBox from '@/assets/images/upArrowBox.png'
import sideArrowBox from '@/assets/images/sideArrowBox.png'
import { propNav } from '@/interfaces/interfaces'

const FullNavBarComponent = (props: propNav) => {

    const changeTempType = () => {
        props.changeType(!props.currentType)
    }

    const goToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    return (
        <div className='z-20 fixed top-[40px] left-[25px] w-44 h-[1000px] bg-[#B7B7B7] rounded-[30px] grid justify-center place-content-between'>

            <div>
                <img className='w-[140px] h-[130px] mt-5' src={hamburg.src} alt="Hamburger Menu" />
                <img className='w-[140px] h-[130px] my-8' src={star.src} alt="Favorite Button" />
                <img onClick={() => { changeTempType() }} className='w-[140px] h-[130px]' src={fTemp.src} alt="Switch Temperature" />
            </div>

            <div>
                <img onClick={() => (goToTop())} className='w-[140px] h-[130px] mb-8' src={upArrowBox.src} alt="Back To Top" />
            </div>
        </div>
    )
}

export default FullNavBarComponent
