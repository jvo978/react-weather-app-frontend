import '../styles/UpcomingForecast.css'

function UpcomingForecast({ upcomingDetails }) {
  return (
    <div className="upcoming__container">
      <div className='upcoming__top'>
        5 DAY FORECAST
      </div>
      <hr />
      <div className='upcoming__bottom'>
        {upcomingDetails.map((detail, id) => {
            return (
            <div key={id} className="upcoming__details">
                <div>{detail.day}</div>
                <div><img alt="icon" src={detail.icon}/></div>
                <div>{detail.temp}°F</div>
            </div>
            )
        })}
      </div>
    </div>
  )
}

export default UpcomingForecast