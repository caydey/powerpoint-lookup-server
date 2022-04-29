import { SOCKET_SERVER } from './config.js';

var searchesListener;
var activeListener;
export default {
  setSearchesListener: function(listener) {
    searchesListener = listener;
  },
  setActiveListener: function(listener) {
    activeListener = listener;
  }
}

const socket = new WebSocket(SOCKET_SERVER);
socket.addEventListener('message', (event) => {
  var json = JSON.parse(event.data);
  const type = json.type;
  const data = json.data;
  if (type === 'SEARCH') {
    if (searchesListener) {
      searchesListener(data);
    }
  } else if (type === 'ACTIVE') {
    if (activeListener) {
      activeListener(data);
    }
  }
})
