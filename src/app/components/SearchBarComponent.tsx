import React, { useEffect, useState } from 'react'
import HomePageComponent from './HomePageComponent'
import NavBarComponent from './NavBarComponent';
import { getCities } from '@/DataServices/DataServices';
import { ICities } from '@/interfaces/interfaces';

const SearchBarComponent = () => {
    const [cityInput, setCityInput] = useState<string>();
    const [showCities, setShowCities] = useState<string[]>();
    const [lon, setLon] = useState<string>();
    const [lat, setLat] = useState<string>();

    const inputCoords = (laty: string, longy: string) => {
        setLat(laty);
        setLon(longy);
    }

    const getThoseCities = () => {
        const innerGetCities = async () => {
            let dataParseArr: string[] = [];

            if (cityInput !== undefined && cityInput !== "") {
                const dataHolder: ICities = await getCities(cityInput);

                if (dataHolder.length > 0) {
                    dataHolder.forEach((place) => {
                        dataParseArr.push(`${place.name}, ${place.state}, ${place.country}, ${place.lat}, ${place.lon}`);
                    });
                }

                setShowCities(dataParseArr);
            } else {
                setShowCities(dataParseArr);
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
                    <input onChange={(e) => setCityInput(e.target.value)} className='bg-[#F3CAF1] rounded-[30px] w-[1000px] h-[100px]' placeholder='Input City' />
                    <div className='flex justify-center'>
                        <div className='w-[960px] bg-[#E6E2DC] rounded-[30px] z-20'>
                            {
                                showCities && showCities.map((location, index) => {
                                    let splitLocal = location.split(", ")
                                    return <div onClick={() => { inputCoords(splitLocal[3], splitLocal[4]) }} key={index} className=''>
                                        <p>{splitLocal[0]}, {splitLocal[1]}, {splitLocal[2]}</p>
                                    </div>
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>

            {
                lon && lat ? <NavBarComponent /> : <NavBarComponent />

            }

            {
                lon && lat ? <HomePageComponent /> : <HomePageComponent />
            }

        </div>
    )
}

export default SearchBarComponent
