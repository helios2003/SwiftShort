const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const routes = require('./routes/routes');
const functions = require('./controllers/url');

dotenv.config();
mongoose.connect('mongodb://localhost:27017/urls');


const app = express();

app.use(cors());
app.use(express.json());

app.use('/', routes);

app.post('/', functions.createURL);
app.get('/:long_url', functions.getURL);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



