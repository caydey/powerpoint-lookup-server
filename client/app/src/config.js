
let SOCKET_HOST = `ws://${window.location.host}/socket`
// use wss if we are using https
if (window.location.protocol === "https:")
  SOCKET_HOST = `wss://${window.location.host}/socket`


let SLIDES_LOCATION = '/slides/'
let API_HOST = '/api'
if (process.env.NODE_ENV === 'development') {
  API_HOST = 'http://localhost:3000/api'
  SOCKET_HOST = 'ws://localhost:3000/'
}
module.exports = {
  SLIDES_LOCATION: SLIDES_LOCATION,
  API_HOST: API_HOST,
  SOCKET_HOST: SOCKET_HOST
}