
module.exports = (wss) => {
  wss.on('connection', (ws) => {
    ws.isAlive = true; // added field to ws object
    ws.on('pong', () => {
      ws.isAlive = true;
    });
  });

  const interval = setInterval(() => {
    wss.clients.forEach((ws) => {
      if (ws.isAlive) {
        ws.isAlive = false;
        ws.ping();
      } else { // dead
        ws.terminate();
      }
    });
  }, 30_000);
}