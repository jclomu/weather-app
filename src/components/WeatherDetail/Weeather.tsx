import { Weather } from '../../hooks/useWeather'
import { formatTemperature } from '../../utils'
import styles from './Weather.module.css'

type WeatherProps = {
  weather: Weather
}

export default function WeeatherDetail({ weather }: WeatherProps) {
  return (
    <div className={styles.container}>
      <h2>{weather.name} Weather</h2>
      <p className={styles.current}>{formatTemperature(weather.main.temp)}&deg;C</p>
      <div className={styles.temperatures}>
        <p>Max: <span>{formatTemperature(weather.main.temp_max)}&deg;C</span></p>
        <p>Min: <span>{formatTemperature(weather.main.temp_min)}&deg;C</span></p>
      </div>
    </div>
  )
}
