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

  const [isC, setIsC] = useState<boolean>(false);

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
    <div>
      <div className="bgImage h-screen w-screen z-10" title="Background Sunrise"></div>

      <div>
        <div className='flex justify-center pt-10'>
          <div className="z-30 w-[52%]">
            <input value={cityInput} onChange={(e) => setCityInput(e.target.value)} className='text-[#600B0B] faunaOne text-2xl 2xl:text-5xl pl-16 bg-[#F3CAF1] rounded-[30px] w-full h-[50px] 2xl:h-[100px]' placeholder='Input City' />
            <div className='flex justify-center'>
              <div className='w-[92%] bg-[#E6E2DC] rounded-[30px] z-20'>
                {
                  showCities && showCities.map((location, index) => {
                    let splitLocal = location.split(", ")
                    return <div onClick={() => { loadCity(location) }} key={index} className='my-6'>
                      {
                        splitLocal[1] !== "undefined" ? <p className='text-[#600B0B] underline text-xl 2xl:text-[32px] faunaOne pl-10'>{splitLocal[0]}, {splitLocal[1]}, {splitLocal[2]}</p> : <p className='text-[#600B0B] underline text-xl 2xl:text-[32px] faunaOne pl-10'>{splitLocal[0]}, {splitLocal[2]}</p>
                      }
                    </div>
                  })
                }
              </div>
            </div>
          </div>
        </div>

        {
          putCityToStorage ? <FullNavBarComponent callFavedCity={setPutCityToStorage} currentType={isC} changeType={setIsC} location={putCityToStorage} /> : <NavBarComponent callFavedCity={setPutCityToStorage}/>
        }

        {
          putCityToStorage ? <FullHomePageComponent tType={isC} location={putCityToStorage} /> : <HomePageComponent />
        }

      </div>
    </div>
  );
}
