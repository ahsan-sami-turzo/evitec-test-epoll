// server.js

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const api = require('./app/api');
const db = require('./app/db');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// Connect to the database
db.connectToDatabase();

app.use('/api', api);

const server = app.listen(PORT, () => {
  console.log("Server listening on port %s", PORT);
});