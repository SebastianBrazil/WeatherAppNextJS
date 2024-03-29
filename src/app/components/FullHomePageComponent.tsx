'use client'

import { getCurWea } from '@/DataServices/DataServices'
import { propLoc } from '@/interfaces/interfaces'

import tempImg from "@/assets/images/thermometer-png-4.png"
import sunImg from "@/assets/images/sunrise-svg-6.png"
import cloudImg from "@/assets/images/Cloud-clip-art-grey-768x502.png"

import React, { useEffect, useState } from 'react'

const FullHomePageComponent = (props: propLoc) => {
    const [title, setTitle] = useState<string>();
    const [date, setDate] = useState<string>();

    const [currentTemp, setCurrentTemp] = useState<string>();
    const [currentHighTemp, setCurrentHighTemp] = useState<string>();
    const [currentLowTemp, setCurrentLowTemp] = useState<string>();
    const [humidity, setHumidity] = useState<string>();
    const [fellsTemp, setFeelsTemp] = useState<string>();

    const [wind, setWind] = useState<string>();
    const [cloudiness, setCloudiness] = useState<string>();
    const [description, setDescription] = useState<string>();
    const [sunrise, setSunrise] = useState<string>();
    const [sunset, setSunset] = useState<string>();

    const todaysDate = () => {
        let daetae = new Date()
        let dd = String(daetae.getDate()).padStart(2, '0');
        let mm = String(daetae.getMonth() + 1);
        let yyyy = daetae.getFullYear();

        setDate(mm + "/" + dd + "/" + yyyy);
    }

    const makeTimeReadable = (slottedTime: number) => {
        let suffix = "AM";
        let unixTime = new Date(slottedTime * 1000);
        let hoRaw = unixTime.getHours()

        if (hoRaw > 12) {
            hoRaw = hoRaw - 12;
            suffix = "PM";
        }

        let ho = String(hoRaw);
        let mi = String(unixTime.getMinutes()).padStart(2, '0');
        return ho + ":" + mi + " " + suffix;
    }

    const capitalize = (words: string) => {
        let array = words.split(" ");
        if (array.length > 1) {
            let cappedArray = array.map(word => word[0].toUpperCase() + word.substring(1))
            return cappedArray.join(" ");
        } else {
            return words[0].toUpperCase() + words.substring(1)
        }
    }

    const getTodayWeather = () => {
        let tempType: string;
        let tempSymbol: string;
        let speedW: string; 

        if (props.tType === false) {
            tempType = "imperial";
            tempSymbol = "° F";
            speedW = "mph";
        } else {
            tempType = "metric";
            tempSymbol = "° C";
            speedW = "mps";
        }

        let splitLocal = props.location.split(", ")

        if (splitLocal[1] !== "undefined") {
            setTitle(`${splitLocal[0]}, ${splitLocal[1]}, ${splitLocal[2]}`)
        } else {
            setTitle(`${splitLocal[0]}, ${splitLocal[2]}`)
        }

        todaysDate();

        const innerGetWeather = async () => {
            const dataHolder = await getCurWea(splitLocal[3], splitLocal[4], tempType);

            // console.log(dataHolder)
            setCurrentTemp(String(Math.round(dataHolder.main.temp)) + tempSymbol);
            setCurrentHighTemp(String(Math.round(dataHolder.main.temp_max)) + "°");
            setCurrentLowTemp(String(Math.round(dataHolder.main.temp_min)) + "°");
            setFeelsTemp(String(Math.round(dataHolder.main.feels_like)) + "°");
            setDescription(capitalize(dataHolder.weather[0].description));

            setCloudiness(dataHolder.clouds.all);
            setHumidity(dataHolder.main.humidity);
            setSunrise(makeTimeReadable(dataHolder.sys.sunrise));
            setSunset(makeTimeReadable(dataHolder.sys.sunset));
            setWind(String(Math.round(dataHolder.wind.speed * 10) / 10) + " " + speedW);
        }
        innerGetWeather();
    }

    useEffect(() => {
        getTodayWeather();
    }, [props]);

    return (
        <div className='absolute top-[140px] left-0 right-0 m-auto z-10 pb-44'>
            <div className='text-center text-[#F3CAF1]'>
                {
                    title ? <p className='shadowT quando text-[64px] mt-24 '>{title}</p> : <p className='shadowT quando text-[64px] z-10 absolute top-52 left-0 right-0 m-auto'>Loading...</p>
                }

                <p className='shadowT quando text-[64px] pb-2 mt-16'>Current Weather for {date}</p>
            </div>

            <div className='flex justify-center'>
                <div className='bg-[#F3CAF1] w-[1300px] border-black border-[5px] px-10'>
                    {
                        currentTemp &&
                        <div>
                            <div className='grid place-items-center pt-6'>
                                <img className='w-48 h-48' src={tempImg.src} alt="Temperature" />
                                <p className='text-[#600B0B] faunaOne text-[64px] -mb-2'>{currentTemp}</p>
                                <p className='text-[#600B0B] faunaOne text-[40px] -my-2'>Feels Like: {fellsTemp}</p>
                                <p className='text-[#600B0B] faunaOne text-[40px] -my-2'>{currentHighTemp} / {currentLowTemp}</p>
                                <p className='text-[#600B0B] faunaOne text-[40px] -my-2'>Description: {description}</p>
                            </div>
                            <div className='grid grid-cols-2 gap-40 -mt-10 pb-6'>
                                <div className='grid place-items-center mb-12'>
                                    <img className='w-48 h-48 -mb-6' src={sunImg.src} alt="Sun" />
                                    <div className='text-left'>
                                        <p className='text-[#600B0B] faunaOne text-[48px]'>Sunrise: {sunrise}</p>
                                        <p className='text-[#600B0B] faunaOne text-[48px]'>Sunset: {sunset}</p>
                                    </div>
                                </div>
                                <div className='grid place-items-center mt-20'>
                                    <img className='w-52 h-36' src={cloudImg.src} alt="Cloud" />
                                    <div className='text-right pt-4'>
                                        <p className='text-[#600B0B] faunaOne text-[48px]'>Wind: {wind}</p>
                                        <p className='text-[#600B0B] faunaOne text-[48px]'>Cloudiness: {cloudiness}%</p>
                                        <p className='text-[#600B0B] faunaOne text-[48px]'>Humidity: {humidity}%</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default FullHomePageComponent
