// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/:date", function (req, res) {
  let date = req.params.date;
  const timestamp = {};

  date = /-|\s/g.test(date) ? new Date(date) : new Date(parseInt(date));

  timestamp.unix = date.getTime();
  timestamp.utc = date.toUTCString();

  res.json(!timestamp.unix || !timestamp.utc ? { error: 'Invalid Date' } : timestamp);
});

app.get("/api", function (req, res) {
  const timestamp = new Date();

  res.json({ unix: timestamp.getTime(), utc: timestamp.toUTCString() });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
