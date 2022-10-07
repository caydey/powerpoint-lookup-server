const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const routes = require('./routes');
const errors = require('./errors');
const socket = require('./socket');


// server setup
const app = express();

const port = 3000;

// parsing json and form data
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());


// development
if (process.env.NODE_ENV === 'development') {
  // serve static files
  app.use("/slides", express.static("../client/slides"));
  // Cross Origin Resource Sharing
  app.use(cors());
}

// configure api routes
routes(app);

// handle errors
errors(app);

// begin server
const server = app.listen(port, () => {
  console.log('Server listening at http://localhost:%s', port);
});

// websockets
socket(server);
