'use client'

import { getCurWea, getForcastWea } from '@/DataServices/DataServices'
import { IDate, propLoc } from '@/interfaces/interfaces'

import tempImg from "@/assets/images/thermometer-png-4.png"
import sunImg from "@/assets/images/sunrise-svg-6.png"
import cloudImg from "@/assets/images/Cloud-clip-art-grey-768x502.png"

import React, { useEffect, useState } from 'react'

const FullHomePageComponent = (props: propLoc) => {
    const [day1Date, setDay1Date] = useState<string>();
    const [day1Temp, setDay1Temp] = useState<string>();
    const [day1Rain, setDay1Rain] = useState<string>();
    const [day1Humid, setDay1Humid] = useState<string>();
    const [day1Cloud, setDay1Cloud] = useState<string>();
    const [day2Date, setDay2Date] = useState<string>();
    const [day2Temp, setDay2Temp] = useState<string>();
    const [day2Rain, setDay2Rain] = useState<string>();
    const [day2Humid, setDay2Humid] = useState<string>();
    const [day2Cloud, setDay2Cloud] = useState<string>();
    const [day3Date, setDay3Date] = useState<string>();
    const [day3Temp, setDay3Temp] = useState<string>();
    const [day3Rain, setDay3Rain] = useState<string>();
    const [day3Humid, setDay3Humid] = useState<string>();
    const [day3Cloud, setDay3Cloud] = useState<string>();
    const [day4Date, setDay4Date] = useState<string>();
    const [day4Temp, setDay4Temp] = useState<string>();
    const [day4Rain, setDay4Rain] = useState<string>();
    const [day4Humid, setDay4Humid] = useState<string>();
    const [day4Cloud, setDay4Cloud] = useState<string>();
    const [day5Date, setDay5Date] = useState<string>();
    const [day5Temp, setDay5Temp] = useState<string>();
    const [day5Rain, setDay5Rain] = useState<string>();
    const [day5Humid, setDay5Humid] = useState<string>();
    const [day5Cloud, setDay5Cloud] = useState<string>();

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

    const getTotWeather = () => {
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
            if (tempType !== "imperial") {
                setCurrentTemp(String(Math.round(dataHolder.main.temp * 10) / 10) + tempSymbol);
                setCurrentHighTemp(String(Math.round(dataHolder.main.temp_max * 10) / 10) + "°");
                setCurrentLowTemp(String(Math.round(dataHolder.main.temp_min * 10) / 10) + "°");
                setFeelsTemp(String(Math.round(dataHolder.main.feels_like * 10) / 10) + "°");
            } else {
                setCurrentTemp(String(Math.round(dataHolder.main.temp)) + tempSymbol);
                setCurrentHighTemp(String(Math.round(dataHolder.main.temp_max)) + "°");
                setCurrentLowTemp(String(Math.round(dataHolder.main.temp_min)) + "°");
                setFeelsTemp(String(Math.round(dataHolder.main.feels_like)) + "°");
            }
            setDescription(capitalize(dataHolder.weather[0].description));

            setCloudiness(dataHolder.clouds.all);
            setHumidity(dataHolder.main.humidity);
            setSunrise(makeTimeReadable(dataHolder.sys.sunrise));
            setSunset(makeTimeReadable(dataHolder.sys.sunset));
            setWind(String(Math.round(dataHolder.wind.speed * 10) / 10) + " " + speedW);
        }
        innerGetWeather();

        const innerGetForecast = async () => {
            const dataHolder: [] = await getForcastWea(splitLocal[3], splitLocal[4], tempType);

            let filteredDays: IDate[] = dataHolder.filter((interval: IDate) => {
                let splitOne = interval.dt_txt.split(" ");
                let splitTwo = splitOne[1].split(":");

                if (splitTwo[0] === '12') {
                    return interval;
                }
            })

            setDay1Date(filteredDays[0].dt_txt.split(" ")[0].split("-")[1] + "/" + filteredDays[0].dt_txt.split(" ")[0].split("-")[2])
            if (tempType === "imperial") {
                setDay1Temp(String(Math.round(filteredDays[0].main.temp)));
            } else {
                setDay1Temp(String(Math.round(filteredDays[0].main.temp * 10) / 10));
            }
            setDay1Rain(String(filteredDays[0].pop * 100));
            setDay1Humid(String(Math.round(filteredDays[0].main.humidity)));
            setDay1Cloud(String(Math.round(filteredDays[0].clouds.all)));

            setDay2Date(filteredDays[1].dt_txt.split(" ")[0].split("-")[1] + "/" + filteredDays[1].dt_txt.split(" ")[0].split("-")[2])
            if (tempType === "imperial") {
                setDay2Temp(String(Math.round(filteredDays[1].main.temp)));
            } else {
                setDay2Temp(String(Math.round(filteredDays[1].main.temp * 10) / 10));
            }
            setDay2Rain(String(filteredDays[1].pop * 100));
            setDay2Humid(String(Math.round(filteredDays[1].main.humidity)));
            setDay2Cloud(String(Math.round(filteredDays[1].clouds.all)));

            setDay3Date(filteredDays[2].dt_txt.split(" ")[0].split("-")[1] + "/" + filteredDays[2].dt_txt.split(" ")[0].split("-")[2])
            if (tempType === "imperial") {
                setDay3Temp(String(Math.round(filteredDays[2].main.temp)));
            } else {
                setDay3Temp(String(Math.round(filteredDays[2].main.temp * 10) / 10));
            }
            setDay3Rain(String(filteredDays[2].pop * 100));
            setDay3Humid(String(Math.round(filteredDays[2].main.humidity)));
            setDay3Cloud(String(Math.round(filteredDays[2].clouds.all)));

            setDay4Date(filteredDays[3].dt_txt.split(" ")[0].split("-")[1] + "/" + filteredDays[3].dt_txt.split(" ")[0].split("-")[2])
            if (tempType === "imperial") {
                setDay4Temp(String(Math.round(filteredDays[3].main.temp)));
            } else {
                setDay4Temp(String(Math.round(filteredDays[3].main.temp * 10) / 10));
            }
            setDay4Rain(String(filteredDays[3].pop * 100));
            setDay4Humid(String(Math.round(filteredDays[3].main.humidity)));
            setDay4Cloud(String(Math.round(filteredDays[3].clouds.all)));

            setDay5Date(filteredDays[4].dt_txt.split(" ")[0].split("-")[1] + "/" + filteredDays[4].dt_txt.split(" ")[0].split("-")[2])
            if (tempType === "imperial") {
                setDay5Temp(String(Math.round(filteredDays[4].main.temp)));
            } else {
                setDay5Temp(String(Math.round(filteredDays[4].main.temp * 10) / 10));
            }
            setDay5Rain(String(filteredDays[4].pop * 100));
            setDay5Humid(String(Math.round(filteredDays[4].main.humidity)));
            setDay5Cloud(String(Math.round(filteredDays[4].clouds.all)));
        }
        innerGetForecast()
    }

    useEffect(() => {
        getTotWeather();
    }, [props]);

    return (
        <div className='absolute top-[140px] lg:top-[80px] 2xl:top-[140px] left-0 right-0 m-auto z-10 pb-20 lg:pb-32 2xl:pb-44'>
            <div className='text-center text-[#F3CAF1]'>
                {
                    title ? <p className='shadowT quando text-5xl 2xl:text-[64px] mt-24 mx-4 lg:mx-52'>{title}</p> : <p className='shadowT quando text-[64px] z-10 absolute top-52 left-0 right-0 m-auto'>Loading...</p>
                }

                <p className='shadowT quando text-5xl 2xl:text-[64px] pb-2 mt-16 max-lg:mx-4 lg:mx-52'>Current Weather for {date}</p>
            </div>

            <div className='flex justify-center'>
                <div className='bg-[#F3CAF1] w-[68%] border-black border-[5px] px-10'>
                    {
                        currentTemp &&
                        <div>
                            <div className='grid place-items-center pt-6'>
                                <img className='w-36 h-36 lg:w-48 lg:h-48' src={tempImg.src} alt="Temperature" />
                                <p className='text-[#600B0B] faunaOne text-3xl lg:text-5xl 2xl:text-[64px]'>{currentTemp}</p>
                                <p className='text-[#600B0B] faunaOne text-xl lg:text-3xl 2xl:text-[40px]'>Feels Like: {fellsTemp}</p>
                                <p className='text-[#600B0B] faunaOne text-xl lg:text-3xl 2xl:text-[40px]'>{currentHighTemp} / {currentLowTemp}</p>
                                <p className='text-[#600B0B] max-lg:text-center faunaOne text-xl lg:text-3xl 2xl:text-[40px]'>Description: {description}</p>
                            </div>
                            <div className='lg:grid lg:grid-cols-2 lg:gap-40 -mt-14 pb-6 flex flex-col'>
                                <div className='grid place-items-center mt-20'>
                                    <img className='w-36 h-36 lg:w-48 lg:h-48 -mb-5 -mt-10' src={sunImg.src} alt="Sun" />
                                    <div className='text-left pt-5 max-lg:text-center'>
                                        <p className='text-[#600B0B] text-2xl faunaOne lg:text-4xl 2xl:text-[48px]'>Your Local Time</p>
                                        <p className='text-[#600B0B] text-lg faunaOne lg:text-4xl 2xl:text-[48px]'>Sunrise: {sunrise}</p>
                                        <p className='text-[#600B0B] text-lg faunaOne lg:text-4xl 2xl:text-[48px]'>Sunset: {sunset}</p>
                                    </div>
                                </div>
                                <div className='grid place-items-center lg:mt-20'>
                                    <img className='w-[160px] h-[96px] lg:w-52 lg:h-36 -mb-7' src={cloudImg.src} alt="Cloud" />
                                    <div className='text-right pt-5 max-lg:text-center'>
                                        <p className='text-[#600B0B] text-2xl faunaOne lg:text-4xl 2xl:text-[48px]'>Wind: {wind}</p>
                                        <p className='text-[#600B0B] text-lg faunaOne lg:text-4xl 2xl:text-[48px]'>Cloudiness: {cloudiness}%</p>
                                        <p className='text-[#600B0B] text-lg faunaOne lg:text-4xl 2xl:text-[48px]'>Humidity: {humidity}%</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>

            <div className='text-center text-[#F3CAF1]'>
                <p className='shadowT quando text-5xl 2xl:text-[64px] lg:mx-52 max-lg:mx-4 mt-20'>Five Day Forecast From {date}</p>
            </div>

            <div className='flex justify-center'>
                <div className='bg-[#F3CAF1] w-[68%] border-black border-t-[5px] border-l-[5px] border-r-[5px]'>
                    {
                        day3Cloud &&
                        <div>
                            <div className='lg:grid lg:grid-cols-3 flex flex-col'>
                                <div className='grid place-items-center'>
                                    <div className='text-left py-8'>
                                        <div className='text-center'>
                                            <p className='text-[#600B0B] faunaOne text-lg lg:text-2xl 2xl:text-[32px]'>{day1Date}</p>
                                        </div>
                                        <p className='text-[#600B0B] -mt-2 mb-6 faunaOne text-lg lg:text-2xl 2xl:text-[32px]'>{day1Temp}° At Noon</p>
                                        <p className='text-[#600B0B] -mb-2 faunaOne text-lg lg:text-2xl 2xl:text-[32px]'>Rain: {day1Rain}%</p>
                                        <p className='text-[#600B0B] mb-6 faunaOne text-lg lg:text-2xl 2xl:text-[32px]'>Humidity: {day1Humid}%</p>
                                        <p className='text-[#600B0B] -mb-1 faunaOne text-lg lg:text-2xl 2xl:text-[32px]'>Cloudiness: {day1Cloud}%</p>
                                    </div>
                                </div>
                                <div className='grid place-items-center border-black max-lg:border-t-[5px] max-lg:border-b-[5px] lg:border-l-[5px] lg:border-r-[5px]'>
                                    <div className='text-left py-8'>
                                        <div className='text-center'>
                                            <p className='text-[#600B0B] faunaOne text-lg lg:text-2xl 2xl:text-[32px]'>{day2Date}</p>
                                        </div>
                                        <p className='text-[#600B0B] -mt-2 mb-6 faunaOne text-lg lg:text-2xl 2xl:text-[32px]'>{day2Temp}° At Noon</p>
                                        <p className='text-[#600B0B] -mb-2 faunaOne text-lg lg:text-2xl 2xl:text-[32px]'>Rain: {day2Rain}%</p>
                                        <p className='text-[#600B0B] mb-6 faunaOne text-lg lg:text-2xl 2xl:text-[32px]'>Humidity: {day2Humid}%</p>
                                        <p className='text-[#600B0B] -mb-1 faunaOne text-lg lg:text-2xl 2xl:text-[32px]'>Cloudiness: {day2Cloud}%</p>
                                    </div>
                                </div>
                                <div className='grid place-items-center'>
                                    <div className='text-left py-8'>
                                        <div className='text-center'>
                                            <p className='text-[#600B0B] faunaOne text-lg lg:text-2xl 2xl:text-[32px]'>{day3Date}</p>
                                        </div>
                                        <p className='text-[#600B0B] -mt-2 mb-6 faunaOne text-lg lg:text-2xl 2xl:text-[32px]'>{day3Temp}° At Noon</p>
                                        <p className='text-[#600B0B] -mb-2 faunaOne text-lg lg:text-2xl 2xl:text-[32px]'>Rain: {day3Rain}%</p>
                                        <p className='text-[#600B0B] mb-6 faunaOne text-lg lg:text-2xl 2xl:text-[32px]'>Humidity: {day3Humid}%</p>
                                        <p className='text-[#600B0B] -mb-1 faunaOne text-lg lg:text-2xl 2xl:text-[32px]'>Cloudiness: {day3Cloud}%</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>

            <div className='flex justify-center'>
                <div className='bg-[#F3CAF1] w-[68%] border-black border-[5px]'>
                    {
                        day5Cloud &&
                        <div>
                            <div className='lg:grid lg:grid-cols-2 flex flex-col'>
                                <div className='grid place-items-center border-black lg:border-r-[3px] max-lg:border-b-[3px]'>
                                    <div className='text-left pt-4 pb-8'>
                                        <div className='text-center'>
                                            <p className='text-[#600B0B] faunaOne text-lg lg:text-2xl 2xl:text-[32px]'>{day4Date}</p>
                                        </div>
                                        <p className='text-[#600B0B] -mt-2 mb-6 faunaOne text-lg lg:text-2xl 2xl:text-[32px]'>{day4Temp}° At Noon</p>
                                        <p className='text-[#600B0B] -mb-2 faunaOne text-lg lg:text-2xl 2xl:text-[32px]'>Rain: {day4Rain}%</p>
                                        <p className='text-[#600B0B] mb-6 faunaOne text-lg lg:text-2xl 2xl:text-[32px]'>Humidity: {day4Humid}%</p>
                                        <p className='text-[#600B0B] faunaOne text-lg lg:text-2xl 2xl:text-[32px]'>Cloudiness: {day4Cloud}%</p>
                                    </div>
                                </div>
                                <div className='grid place-items-center border-black lg:border-l-[3px] max-lg:border-t-[3px]'>
                                    <div className='text-left pt-4 pb-8'>
                                        <div className='text-center'>
                                            <p className='text-[#600B0B] faunaOne text-lg lg:text-2xl 2xl:text-[32px]'>{day5Date}</p>
                                        </div>
                                        <p className='text-[#600B0B] -mt-2 mb-6 faunaOne text-lg lg:text-2xl 2xl:text-[32px]'>{day5Temp}° At Noon</p>
                                        <p className='text-[#600B0B] -mb-2 faunaOne text-lg lg:text-2xl 2xl:text-[32px]'>Rain: {day5Rain}%</p>
                                        <p className='text-[#600B0B] mb-6 faunaOne text-lg lg:text-2xl 2xl:text-[32px]'>Humidity: {day5Humid}%</p>
                                        <p className='text-[#600B0B] faunaOne text-lg lg:text-2xl 2xl:text-[32px]'>Cloudiness: {day5Cloud}%</p>
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
