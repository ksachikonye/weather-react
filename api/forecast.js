const axios = require('axios')

const API_KEY = process.env.API_KEY

export default function handler(req, res) {
  const {latlong} = req.query
  const [lat, long] = latlong ? latlong.split(',') : [0, 0]
  const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${long}&exclude=minutely&appid=${API_KEY}`
  axios
    .get(url)
    .then((response) => {
      const {data} = response
      res.status(200)
      res.json(data)
    })
    .catch((err) => {
      res.status(err.response ? err.response.status : 500)
      res.send(err.message || 'Something went wrong! Please try again later.')
    })
}
