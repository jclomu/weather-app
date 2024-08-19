import axios from "axios"
import { SearchType } from "../types"
import { object, string, number, InferOutput, parse } from 'valibot'
import { useMemo, useState } from "react"


//TYPE GUARD OR ASSETION: IDENTIFIES THE TYPE OF THE RESPONSE 
// function isWeatherResponse(weather : unknown) : weather is Weather{
//     return (
//         Boolean(weather) &&
//         typeof weather === 'object' && 
//         typeof (weather as Weather).name === 'string' &&
//         typeof (weather as Weather).main.temp === 'number' &&
//         typeof (weather as Weather).main.temp_max === 'number' &&
//         typeof (weather as Weather).main.temp_min === 'number' 

//     )
// }

// ZOD
// const Weather = z.object({
//     name: z.string(),
//     main: z.object({
//         temp: z.number(),
//         temp_max: z.number(),
//         temp_min: z.number()
//     })
// })
// type Weather = z.infer<typeof Weather>


// Valibot
const WeatherSchema = object({
    name: string(),
    main: object({
        temp: number(),
        temp_max: number(),
        temp_min: number()
    })
})

const initilState = {
    name: '',
    main: {
        temp: 0,
        temp_max: 0,
        temp_min: 0
    }
}

export type Weather = InferOutput<typeof WeatherSchema>

export default function useWeather() {

    const [weather, setWeather] = useState<Weather>(initilState)
    const [loading, setLoading] = useState(false)
    const [notFound, setNotFound] = useState(false)

    const fetchWeather = async (search: SearchType) => {

        const appId = import.meta.env.VITE_API_KEY
        setLoading(true)
        setWeather(initilState)

        try {
            const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${search.city},${search.country}&appid=${appId}`
            const { data } = await axios(geoUrl)

            if(!data[0]) {
               setNotFound(true)
            }

            const lat = data[0].lat
            const lon = data[0].lon

            const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appId}`

            // Castear Type
            // const { data: weatherResult } = await axios<Weather>(weatherUrl)
            // console.log(weatherResult.name)
            // console.log(weatherResult.main.temp)

            // Type guards
            // const { data: weatherResult } = await axios(weatherUrl)
            // const result = isWeatherResponse(weatherResult)
            // if(result) {

            //     console.log(weatherResult.name)
            // }

            // ZOD
            // const { data: weatherResult } = await axios(weatherUrl)
            // const result = Weather.safeParse(weatherResult)
            // if(result.success) {
            //     console.log(result.data.name)
            //     console.log(result.data.main.temp)
            // } else {
            //     console.log('error al consultar')
            // }

            // Valibot
            const { data: weatherResult } = await axios(weatherUrl)
            const result = parse(WeatherSchema, weatherResult)
            if (result) {
                setWeather(result)
            }



        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const hasWeatherData = useMemo(() => weather.name, [weather])
    return {
        weather,
        loading,
        notFound,
        setNotFound,
        fetchWeather,
        hasWeatherData
        
    }
}
