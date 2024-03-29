import { weatherApiKey } from "./Keyring";

export const getCities = async (userInput: string) => {
    const promise = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${userInput}&limit=5&appid=${weatherApiKey}`)
    const data = await promise.json();

    return data;
}

export const getCurWea = async (lat: string, lon: string, tempType: string) => {
    const promise = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${weatherApiKey}&units=${tempType}`)
    const data = await promise.json();

    return data;
}

export const getForcastWea = async (lat: string, lon: string, tempType: string) => {
    const promise = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${weatherApiKey}&units=${tempType}`)
    const data = await promise.json();

    return data.list;
}


