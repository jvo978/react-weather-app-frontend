import PropTypes from 'prop-types'
import '../styles/CurrentForecastDetails.css'

function CurrentForecastDetails({ forecastDetails }) {
  return (
    <div className='currentForecast__details'>
        {forecastDetails.map((details, i) => {
            return (
              <div key={i} className="currentForecast__detailItem">
                <div>{details.name}</div>
                <div>{details.value}{details.units}</div>
              </div>
            )
        })}
    </div>
  )
}

CurrentForecastDetails.propTypes = {
    forecastDetails: PropTypes.array
}

export default CurrentForecastDetails