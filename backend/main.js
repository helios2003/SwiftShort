const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const cron = require('node-cron');

const routes = require('./routes/routes');
//const redis = require('./controllers/cache');

dotenv.config();

async function connectDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
    console.log('Connected to database');
  } catch (error) {
    console.error('Error connecting to database:', error.message);
  }
}

async function startServer() {
  await connectDatabase();
  mongoose.connection.setMaxListeners(20);

  const app = express();
  app.use(cors());
  app.use(bodyParser.json());
  app.use('/', routes);

  // cron.schedule('*/3 * * * *', async () => {
  //   await redis.updateTopURLs();
  // });

  app.use(express.static(path.join(__dirname, 'frontend')));
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
  });

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

startServer();
