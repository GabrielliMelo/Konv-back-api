require('dotenv').config();

const app = require('./server');

const PORT = process.env.PORT || 3008;

app.listen(PORT);