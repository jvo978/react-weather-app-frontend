import PropTypes from 'prop-types'
import '../styles/CurrentForecast.css'

function CurrentForecast({ day, date, temp, location, icon, description }) {
  return (
      <div className='currentForecast__container'>
        <span>{day}</span>
        <span>{date}</span>
        <span>{temp}°F</span>
        <span>{location}</span>
        <span><img alt="icon" src={icon}/></span>
        <span>{description}</span>
      </div>
  )
}

CurrentForecast.propTypes = {
    day: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    temp: PropTypes.number.isRequired,
    location: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
}

export default CurrentForecast