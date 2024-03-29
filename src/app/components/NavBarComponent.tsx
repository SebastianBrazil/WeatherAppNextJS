'use client'

import React, { useEffect, useState } from 'react'
import hamburg from '@/assets/images/hambib.png'
import sideArrow from "@/assets/images/sideArrowBox.png"
import remove from "@/assets/images/xClose.png"
import 'bootstrap/dist/css/bootstrap.min.css';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { getLocalStorage, removeFromLocalStorage } from '@/DataServices/LocalStorage';
import { propFav } from '@/interfaces/interfaces';

const NavBarComponent = (props: propFav) => {
    const [favedList, setFavedList] = useState<string[]>();
    const [isFlipped, setIsFlipped] = useState<boolean>(false);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const getFavedStorage = () => {
        setFavedList(getLocalStorage())
    }

    const removeCity = (city: string) => {
        removeFromLocalStorage(city);
        setIsFlipped(!isFlipped);
    }

    useEffect(() => {
        getFavedStorage();
    }, [isFlipped])

    return (
        <>
            <div className='z-20 absolute top-[40px] left-[25px] w-44 h-40 bg-[#B7B7B7] rounded-[30px] grid place-items-center'>
                <img onClick={handleShow} className='w-[140px] h-[130px]' src={hamburg.src} alt="Hamburger Menu" />
            </div>

            <Offcanvas className="min-w-[850px] forceStyle" show={show} onHide={handleClose}>
                <Offcanvas.Header>
                    <div className='flex items-center pt-9 pl-6'>
                        <img onClick={() => { handleClose() }} className='w-36 h-36' src={sideArrow.src} alt="Back Button" />
                        <h1 className='pl-12 text-[85px] text-[#600B0B] quando'>Saved Cities</h1>
                    </div>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    {
                        favedList && favedList.map((city, index) => {
                            let splitLoc = city.split(", ");
                            return <div className='flex justify-between' key={index} >
                                {
                                    splitLoc[1] !== "undefined" ? <p onClick={() => { props.callFavedCity(city); handleClose() }} className='text-[#600B0B] underline text-[36px] faunaOne pl-10 pt-12 mr-20'>{splitLoc[0]}, {splitLoc[1]}, {splitLoc[2]}</p> : <p onClick={() => { props.callFavedCity(city); handleClose() }} className='mr-20 pt-12 text-[#600B0B] underline text-[36px] faunaOne pl-10'>{splitLoc[0]}, {splitLoc[2]}</p>
                                }
                                <img className='h-9 w-9 mt-14 mr-12' onClick={() => { removeCity(city) }} src={remove.src} alt="Remove Favorite" />
                            </div>
                        })
                    }
                </Offcanvas.Body>
            </Offcanvas>
        </>
    )
}

export default NavBarComponent
