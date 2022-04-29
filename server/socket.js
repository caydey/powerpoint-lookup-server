const WebSocket = require('ws');

const { generateId } = require('./middleware/generate-header-id.js')

const TYPE = {
  SEARCH: "SEARCH",
  ACTIVE: "ACTIVE"
};

const ping = require('./socket/ping.js');


var wss;
module.exports = (server) => {
  wss = new WebSocket.Server({
    noServer: true,
    path: '/socket'
  });
  
  server.on('upgrade', (request, socket, head) => {
    if (request.headers['upgrade'].toLowerCase() === "websocket") {
      wss.handleUpgrade(request, socket, head, (socket) => {
        wss.emit('connection', socket, request);
      });
    }
  });
  ping(wss);
  
  wss.on('connection', (ws, req) => {
    const id = generateId(req.headers)
    connUser(id);
    broadcastActiveConnections();
    ws.on('close', (event) => {
      closeUser(id); // same id created with const id ...
      broadcastActiveConnections();
    })
  });
}

var uniqueUsers = new Set();
function connUser(id) {
  uniqueUsers.add(id);
}
function closeUser(id) {
  uniqueUsers.delete(id);
}
function getUniqueUsers() {
  return uniqueUsers.size;
}

function broadcastJson(json) {
  const stringifyed = JSON.stringify(json);
  if (wss) {
    wss.clients.forEach((client) => {
      client.send(stringifyed);
    });
  }
}
function broadcastActiveConnections() {
  const json = {
    type: TYPE.ACTIVE,
    data: wss.clients.size
  };
  broadcastJson(json);
}


const broadcastSearch = (search) => {
  const json = {
    type: TYPE.SEARCH,
    data: search
  }
  broadcastJson(json);
}
module.exports.broadcastSearch = broadcastSearch;
