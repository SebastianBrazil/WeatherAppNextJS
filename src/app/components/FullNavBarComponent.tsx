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
            <div className='max-lg:flex max-lg:justify-center'>
                <div className='z-40 fixed top-[20px] lg:left-[25px] w-[90%] lg:w-auto h-32 lg:h-[93%]'>
                    <div className='w-full lg:w-36 2xl:w-44 h-full bg-[#B7B7B7] rounded-[30px] lg:grid lg:justify-center lg:items-center lg:place-content-between max-lg:flex max-lg:justify-center max-lg:items-center'>
                        <div className='max-lg:flex'>
                            <img onClick={handleShow} className='w-[90px] h-[90px] 2xl:w-[140px] 2xl:h-[130px] lg:mt-3' src={hamburg.src} alt="Hamburger Menu" />
                            <img onClick={() => { saveOrRemove() }} className='w-[90px] h-[90px] 2xl:w-[140px] 2xl:h-[130px] lg:my-8' src={isFaved ? fullStar.src : star.src} alt="Favorite Button" />
                            <img onClick={() => { changeTempType() }} className='w-[90px] h-[90px] 2xl:w-[140px] 2xl:h-[130px]' src={props.currentType ? cTemp.src : fTemp.src} alt="Switch Temperature" />
                        </div>

                        <div>
                            <img onClick={() => (goToTop())} className='w-[90px] h-[90px] 2xl:w-[140px] 2xl:h-[130px] lg:my-8' src={upArrowBox.src} alt="Back To Top" />
                        </div>
                    </div>
                </div>
            </div>

            <Offcanvas className="min-w-[44%] forceStyle" show={show} onHide={handleClose}>
                <Offcanvas.Header>
                    <div className='flex items-center pt-9 pl-6'>
                        <img onClick={() => { handleClose() }} className='w-20 h-20 lg:w-28 lg:h-28 2xl:w-36 2xl:h-36' src={sideArrow.src} alt="Back Button" />
                        <h1 className='pl-12 text-3xl lg:text-6xl 2xl:text-[85px] text-[#600B0B] quando'>Saved Cities</h1>
                    </div>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    {
                        favedList && favedList.map((city, index) => {
                            let splitLoc = city.split(", ");
                            return <div className='flex justify-between' key={index} >
                                {
                                    splitLoc[1] !== "undefined" ? <p onClick={() => { props.callFavedCity(city); handleClose() }} className='text-[#600B0B] underline text-xl lg:text-3xl 2xl:text-[36px] faunaOne pl-10 pt-12 mr-10'>{splitLoc[0]}, {splitLoc[1]}, {splitLoc[2]}</p> : <p onClick={() => { props.callFavedCity(city); handleClose() }} className='mr-10 pt-12 text-[#600B0B] underline text-xl lg:text-3xl 2xl:text-[36px] faunaOne pl-10'>{splitLoc[0]}, {splitLoc[2]}</p>
                                }
                                <img className='h-5 w-5 lg:h-7 lg:w-7 2xl:h-9 2xl:w-9 mt-14 lg:mt-12 2xl:mt-14 mr-12' onClick={() => { removeCity(city) }} src={remove.src} alt="Remove Favorite" />
                            </div>
                        })
                    }
                </Offcanvas.Body>
            </Offcanvas>
        </>
    )
}

export default FullNavBarComponent
