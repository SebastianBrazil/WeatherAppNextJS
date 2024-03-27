import { propCoord } from '@/interfaces/interfaces'
import React from 'react'

const FullHomePageComponent = (props: propCoord) => {
    return (
        <div>
            <div className='text-center text-[#F3CAF1] slate'>
                <p className='shadowT quando text-8xl z-10 absolute top-52 left-0 right-0 m-auto'>Forcast Finder</p>
                <p className='shadowT quando text-5xl absolute bottom-16 left-0 right-0 m-auto'>Bit Chilly Innit?</p>
            </div>
        </div>
    )
}

export default FullHomePageComponent
