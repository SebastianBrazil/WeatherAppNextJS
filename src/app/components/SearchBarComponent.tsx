import React, { useEffect, useState } from 'react'
import HomePageComponent from './HomePageComponent'
import NavBarComponent from './NavBarComponent';
import { getCities } from '@/DataServices/DataServices';
import { ICities } from '@/interfaces/interfaces';
import FullNavBarComponent from './FullNavBarComponent';
import FullHomePageComponent from './FullHomePageComponent';

const SearchBarComponent = () => {
    const [cityInput, setCityInput] = useState<string>();
    const [showCities, setShowCities] = useState<string[]>();
    const [putCityToStorage, setPutCityToStorage] = useState<string>();
    const [lon, setLon] = useState<string>();
    const [lat, setLat] = useState<string>();

    const inputCoords = (location: string) => {
        setPutCityToStorage(location)

        let splitLocal = location.split(", ")
        setLat(splitLocal[3]);
        setLon(splitLocal[4]);
    }

    const getThoseCities = () => {
        const innerGetCities = async () => {
            if (cityInput !== undefined && cityInput !== "") {
                let dataParseArr: string[] = [];
                const dataHolder: ICities = await getCities(cityInput);

                if (dataHolder.length > 0) {
                    dataHolder.forEach((place) => {
                        dataParseArr.push(`${place.name}, ${place.state}, ${place.country}, ${place.lat}, ${place.lon}`);
                    });
                }

                setShowCities(dataParseArr);
            } else {
                setShowCities([]);
            }
        }
        innerGetCities();
    }

    const clearCities = () => {
        if (cityInput === "") {
            setShowCities(undefined);
        }
    }

    useEffect(() => {
        getThoseCities();
        clearCities();
    }, [cityInput])

    return (
        <div>
            <div className='flex justify-center pt-10'>
                <div>
                    <input onChange={(e) => setCityInput(e.target.value)} className='text-[#600B0B] faunaOne text-5xl pl-16 bg-[#F3CAF1] rounded-[30px] w-[1000px] h-[100px]' placeholder='Input City' />
                    <div className='flex justify-center'>
                        <div className='w-[920px] bg-[#E6E2DC] rounded-[30px] z-20'>
                            {
                                showCities && showCities.map((location, index) => {
                                    let splitLocal = location.split(", ")
                                    return <div onClick={() => { inputCoords(location) }} key={index} className='my-6'>
                                        {
                                            splitLocal[1] !== "undefined" ? <p className='text-[#600B0B] underline text-[32px] faunaOne pl-10'>{splitLocal[0]}, {splitLocal[1]}, {splitLocal[2]}</p> : <p className='text-[#600B0B] underline text-[32px] faunaOne pl-10'>{splitLocal[0]}, {splitLocal[2]}</p>
                                        }
                                    </div>
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>

            {
                putCityToStorage ? <FullNavBarComponent location={putCityToStorage} /> : <NavBarComponent />

            }

            {
                lon && lat ? <FullHomePageComponent lat={lat} lon={lon} /> : <HomePageComponent />
            }

        </div>
    )
}

export default SearchBarComponent
