const getCurrentForecastDetails = (main, wind) => ([
    {
        name: 'Pressure',
        value: Math.round((main.pressure * 0.029529983071445)),
        units: 'in'
    },
    {
        name: 'Humidity',
        value: main.humidity,
        units: '%'
    },
    {
        name: 'Wind',
        value: Math.round(wind.speed),
        units: 'mph'
    },
    {
        name: 'Min Temp',
        value: Math.round(main.temp_min),
        units: '°F'
    },
    {
        name: 'Max Temp',
        value: Math.round(main.temp_max),
        units: '°F'
    },
])

export default getCurrentForecastDetails