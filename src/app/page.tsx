'use client'

import { getCities } from "@/DataServices/DataServices";
import { ICities } from "@/interfaces/interfaces";
import { useEffect, useState } from "react";
import FullNavBarComponent from "./components/FullNavBarComponent";
import FullHomePageComponent from "./components/FullHomePageComponent";
import NavBarComponent from "./components/NavBarComponent";
import HomePageComponent from "./components/HomePageComponent";

export default function Home() {
  const [cityInput, setCityInput] = useState<string>("");
  const [showCities, setShowCities] = useState<string[]>();
  const [putCityToStorage, setPutCityToStorage] = useState<string>();

  const loadCity = (location: string) => {
    setPutCityToStorage(location)
    setCityInput("");
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

  useEffect(() => {
    getThoseCities();
  }, [cityInput])


  return (
    <div className="bgImage h-screen w-screen" title="Background Sunrise">
      <div>
        <div className='flex justify-center pt-10'>
          <div>
            <input value={cityInput} onChange={(e) => setCityInput(e.target.value)} className='text-[#600B0B] faunaOne text-5xl pl-16 bg-[#F3CAF1] rounded-[30px] w-[1000px] h-[100px]' placeholder='Input City' />
            <div className='flex justify-center'>
              <div className='w-[920px] bg-[#E6E2DC] rounded-[30px] z-20'>
                {
                  showCities && showCities.map((location, index) => {
                    let splitLocal = location.split(", ")
                    return <div onClick={() => { loadCity(location) }} key={index} className='my-6'>
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
          putCityToStorage ? <FullNavBarComponent location={putCityToStorage} /> : <NavBarComponent/>
        }

        {
          putCityToStorage ? <FullHomePageComponent location={putCityToStorage} /> : <HomePageComponent />
        }

      </div>
    </div>
  );
}
