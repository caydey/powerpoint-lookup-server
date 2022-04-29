var STATIC_HOST = '/'

var SOCKET_HOST = `ws://${window.location.host}/`

if (process.env.VUE_APP_USE_SECURE_WEBSOCKETS) {
  SOCKET_HOST = `wss://${window.location.host}/`
}

if (process.env.NODE_ENV === 'development') {
  STATIC_HOST = 'http://localhost:3000/'
  SOCKET_HOST = 'ws://localhost:3000/'
}
module.exports = {
  STATIC_HOST: STATIC_HOST,
  API_QUERY: `${STATIC_HOST}api/v1/query`,
  SOCKET_SERVER: `${SOCKET_HOST}socket`
}