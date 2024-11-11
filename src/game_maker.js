const express = require('express');
const path = require('path');
const app = express();
const RiotApiHandler = require('./riot_api_calls').RiotApiHandler;

// include css/js files
app.use(express.static('static'));
// Set the view engine to ejs
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('./index', { title: 'EJS Example', message: 'Hello from EJS!' });
});

app.listen(3000, () => {

    console.log('HTML Maker Server is running on port 3000');
  });