import PropTypes from 'prop-types'
import CurrentForecast from './CurrentForecast'
import CurrentForecastDetails from './CurrentForecastDetails'
import UpcomingForecast from './UpcomingForecast'
import '../styles/Forecast.css'


function Forecast({ forecast }) {
  return (
    <div className="forecast__container">
        <div className="forecast__current">
            <CurrentForecast {...forecast.currentForecast}/>
        </div>
        <div className="forecast__details">
          <CurrentForecastDetails forecastDetails={forecast.currentForecastDetails} />
        </div>
        <div className='forecast__upcoming'>
          <UpcomingForecast upcomingDetails={forecast.upcomingForecast} />
        </div>
    </div>
  )
}

Forecast.propTypes = {
  forecast: PropTypes.shape({
    currentForecast: PropTypes.object,
    currentForecastDetails: PropTypes.array,
    upcomingForecast: PropTypes.array
  })
}

export default Forecast;
