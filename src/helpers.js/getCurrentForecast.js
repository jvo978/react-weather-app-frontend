import moment from 'moment'

const getCurrentForecast = (temp, name, time, weather) => ({
    day: moment(time * 1000).format('dddd'),
    date: moment(time * 1000).format('MMMM Do'),
    temp: Math.round(temp),
    location: name,
    icon: `http://openweathermap.org/img/wn/${weather.icon}@2x.png`,
    description: weather.main
})

export default getCurrentForecast