'use client'

import React, { useEffect, useState } from 'react'
import hamburg from '@/assets/images/hambib.png'
import star from '@/assets/images/stare.png'
import fullStar from '@/assets/images/stareye.png'
import fTemp from '@/assets/images/fff.png'
import cTemp from '@/assets/images/ccc.png'
import upArrowBox from '@/assets/images/upArrowBox.png'
import sideArrow from "@/assets/images/sideArrowBox.png"
import remove from "@/assets/images/xClose.png"
import 'bootstrap/dist/css/bootstrap.min.css';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { propNav } from '@/interfaces/interfaces'
import { getLocalStorage, removeFromLocalStorage, saveToLocalStorage } from '@/DataServices/LocalStorage'

const FullNavBarComponent = (props: propNav) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [favedList, setFavedList] = useState<string[]>();
    const [isFaved, setIsFaved] = useState<boolean>(false);
    const [isFlipped, setIsFlipped] = useState<boolean>(false);

    const changeTempType = () => {
        props.changeType(!props.currentType)
    }

    const goToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    const checkFaves = () => {
        let favesArr: string[] = getLocalStorage();

        let checkIfInside = favesArr.filter(city => city === props.location)

        if (checkIfInside.length != 0) {
            setIsFaved(true);
        } else {
            setIsFaved(false);
        }
    }

    const getFavedStorage = () => {
        setFavedList(getLocalStorage())
    }

    const removeCity = (city: string) => {
        removeFromLocalStorage(city);
        setIsFlipped(!isFlipped);
    }

    const saveOrRemove = () => {
        if (isFaved === true) {
            removeFromLocalStorage(props.location)
            setIsFaved(false);
        } else {
            saveToLocalStorage(props.location)
            setIsFaved(true);
        }
        setIsFlipped(!isFlipped);
    }

    useEffect(() => {
        checkFaves();
        getFavedStorage();
    }, [props, isFlipped]);

    return (
        <>
            <div className='z-20 fixed top-[40px] left-[25px] w-44 h-[1000px] bg-[#B7B7B7] rounded-[30px] grid justify-center place-content-between'>

                <div>
                    <img onClick={handleShow} className='w-[140px] h-[130px] mt-3' src={hamburg.src} alt="Hamburger Menu" />
                    <img onClick={() => { saveOrRemove() }} className='w-[140px] h-[130px] my-8' src={isFaved ? fullStar.src : star.src} alt="Favorite Button" />
                    <img onClick={() => { changeTempType() }} className='w-[140px] h-[130px]' src={props.currentType ? cTemp.src : fTemp.src} alt="Switch Temperature" />
                </div>

                <div>
                    <img onClick={() => (goToTop())} className='w-[140px] h-[130px] mb-8' src={upArrowBox.src} alt="Back To Top" />
                </div>
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
                                    splitLoc[1] !== "undefined" ? <p onClick={() => { props.callFavedCity(city); handleClose() }} className='text-[#600B0B] underline text-[36px] faunaOne pl-10 pt-12 mr-20'>{splitLoc[0]}, {splitLoc[1]}, {splitLoc[2]}</p> : <p onClick={() => { props.callFavedCity(city) }} className='mr-20 pt-12 text-[#600B0B] underline text-[36px] faunaOne pl-10'>{splitLoc[0]}, {splitLoc[2]}</p>
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

export default FullNavBarComponent
