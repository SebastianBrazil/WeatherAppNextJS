'use client'

import { getCurWea } from '@/DataServices/DataServices'
import { propLoc } from '@/interfaces/interfaces'
import React, { useEffect, useState } from 'react'

const FullHomePageComponent = (props: propLoc) => {
    const [tempType, setTempType] = useState<string>("imperial");
    const [title, setTitle] = useState<string>();
    const [date, setDate] = useState<string>();

    const todaysDate = ()=>{
        let daetae = new Date()
        let dd = String(daetae.getDate()).padStart(2, '0');
        let mm = String(daetae.getMonth() + 1).padStart(2, '0');
        let yyyy = daetae.getFullYear();

        setDate(mm + "/" + dd + "/" + yyyy);
    }

    const getTodayWeather = () => {
        let splitLocal = props.location.split(", ")

        if (splitLocal[1] !== "undefined") {
            setTitle(`${splitLocal[0]}, ${splitLocal[1]}, ${splitLocal[2]}`)
        } else {
            setTitle(`${splitLocal[0]}, ${splitLocal[2]}`)
        }

        todaysDate();

        const innerGetWeather = async () => {
            const dataHolder = await getCurWea(splitLocal[3], splitLocal[4], tempType);
        }
        innerGetWeather();
    }

    useEffect(() => {
        getTodayWeather();
    }, [props]);

    return (
        <div>
            <div className='text-center text-[#F3CAF1]'>
                {
                    title ? <p className='shadowT quando text-[64px] z-10 absolute top-60 left-0 right-0 m-auto'>{title}</p> : <p className='shadowT quando text-[64px] z-10 absolute top-52 left-0 right-0 m-auto'>Loading...</p>
                }

                <p className='shadowT quando text-[64px] z-10 absolute top-[400px] left-0 right-0 m-auto'>Current Weather for {date}</p>
            </div>
        </div>
    )
}

export default FullHomePageComponent
