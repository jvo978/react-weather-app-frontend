import moment from 'moment'

const getUpcomingForecast = list => (
    list.slice(1,6).map(item => ({
        day: moment(item.dt * 1000).format('dddd').substring(0, 3),
        icon: `http://openweathermap.org/img/wn/${item.weather[0].icon}.png`,
        temp: Math.round(item.temp.day)
    }))
)
export default getUpcomingForecast