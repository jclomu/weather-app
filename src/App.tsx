import styles from './App.module.css'
import Alert from './components/Alert/Alert'
import Form from './components/Form/Form'
import Spinner from './components/Spinner/Spinner'
import WeeatherDetail from './components/WeatherDetail/Weeather'
import useWeather from './hooks/useWeather'



function App() {

  const { weather, loading, notFound, setNotFound, fetchWeather, hasWeatherData } = useWeather()

  return (
    <>
      <h1 className={styles.title}>WEATHER WEB APP</h1>

      <div className={styles.container}>
        <Form
          fetchWeather={fetchWeather}
          setNotFound={setNotFound}
        />

        {loading && <Spinner />}
        {hasWeatherData && <WeeatherDetail weather={weather}/>}
        {notFound && <Alert>City Not Found</Alert>}
      </div>
    </>
  )
}

export default App
