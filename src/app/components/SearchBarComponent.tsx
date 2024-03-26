import React, { useEffect, useState } from 'react'
import DataHolderComponent from './DataHolderComponent'
import NavBarComponent from './NavBarComponent';
import { getCities } from '@/DataServices/DataServices';
import { ICities } from '@/interfaces/interfaces';

const SearchBarComponent = () => {
    const [cityInput, setCityInput] = useState<string>();
    const [showCities, setShowCities] = useState<string[]>();

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

    useEffect(() => {
        getThoseCities();
    }, [cityInput])

    return (
        <div>
            <div className='flex justify-center'>
                <div>
                    <input onChange={(e) => setCityInput(e.target.value)} className='bg-[#F3CAF1] w-80 h-20' placeholder='Input City' />
                    {
                        showCities && showCities.map((location, index) => {
                            let splitLocal = location.split(", ")
                            return <div key={index} className='w-80 h-20 bg-[#F3CAF1]'>
                                <p>{splitLocal[0]}, {splitLocal[1]}, {splitLocal[2]}</p>
                            </div>
                        })
                    }
                </div>
            </div>

            {/* <NavBarComponent />
            <DataHolderComponent /> */}

        </div>
    )
}

export default SearchBarComponent
