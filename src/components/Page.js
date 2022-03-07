import Form from './Form'
import Map from './Map';
import Forecast from './Forecast'
import '../styles/Page.css'
import axios from 'axios';
import { useEffect, useState } from 'react'
import getCurrentForecast from '../helpers.js/getCurrentForecast';
import getCurrentForecastDetails from '../helpers.js/getCurrentForecastDetails';
import getUpcomingForecast from '../helpers.js/getUpcomingForecast';

const BASEURL = "https://community-open-weather-map.p.rapidapi.com"
const HEROKU_URL = "https://weather-jvo978-reactjs.herokuapp.com"

function Page() {

const [error, setError] = useState(false)
const [errorMessage, setErrorMessage] = useState('')
const [forecast, setForecast] = useState(null)
const [latLng, setlatLng] = useState(null)
const [listOfHistory, setListOfHistory] = useState([])

const onLoad = () => {
    axios.get(`${HEROKU_URL}/`).then((response) => {
        if (response.data.err) {
            return;
        }
        setListOfHistory(response.data)
    })
}

useEffect(() => {
    onLoad()
}, [])

const onSubmit = async location => {
    try {
        const { data } = await axios({
            method: 'GET',
            url: `${BASEURL}/weather`,
            params: {
                q: location,
                units: 'imperial'
            },
            headers: {
                'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com',
                'x-rapidapi-key': process.env.REACT_APP_RAPID_API_KEY
            }
        })

        if (!data || data.length === 0) {
            setError(true)
            throw new SyntaxError('Location was not found...')
        }

        const response = await axios({
            method: 'GET',
            url: `${BASEURL}/forecast/daily`,
            params: {
                id: data.id,
                units: 'imperial'
            },
            headers: {
                'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com',
                'x-rapidapi-key': process.env.REACT_APP_RAPID_API_KEY
            }
        })

        if (!response.data || response.data.length === 0) {
            setError(true)
            throw new SyntaxError('No additional forecast found for this location..')
        }

        await axios.post(`${HEROKU_URL}/`, { 
            location_id: data.id,
            location: data.name,
            country: data.sys.country,
            lat: data.coord.lat,
            lon: data.coord.lon
        }).then((response) => {
            if (response.data.err) {
                console.log(response.data.err)
                return;
            } else {
                onLoad()
            }
        })

        const currentForecast = getCurrentForecast(data.main.temp, data.name, data.dt, data.weather[0]);
        const currentForecastDetails = getCurrentForecastDetails(data.main, data.wind)
        const upcomingForecast = getUpcomingForecast(response.data.list)

        setForecast({ currentForecast, currentForecastDetails, upcomingForecast })
        setlatLng({ lat: data.coord.lat, lng: data.coord.lon })
        setError(false)

    } catch(err) {
        setError(true)
        if (forecast) {
            setForecast({...forecast})
        }
        if (err.response.data.message) {
            setErrorMessage(err.response.data.message)
        } else {
            setErrorMessage(err.message)
        }
    }
}

  return (
        <div className={ forecast ? "page__container" : "page__none" }>
            <div className='page__header'>Weather App</div>
                <Form submitSearch={onSubmit} setError={setError} setErrorMessage={setErrorMessage}/>
            {error && <div className="page__errorMessage">{errorMessage}</div>} 
            <div className="page__forecastMapContainer">
                {forecast && 
                    <div className='page__forecastMap'>
                        <Forecast forecast={forecast} />
                        <Map latLong={latLng} />
                     </div>
                }
                {listOfHistory.length > 0 && 
                    <div className='historyList'>
                        <div className='recentSearch'>Recent Searches</div>
                        {listOfHistory.map((item, i) => {
                            return (
                                <ul key={i}>
                                    <li onClick={() => { onSubmit(item.location)} }>{item.location}, {item.country}</li>
                                </ul>
                                )
                     })}
                 </div>
                }
            </div>
        </div>
  )
}

export default Page;
