require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const authRoutes = require('./routes/auth');
const todoRoutes = require('./routes/todos');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/auth', authRoutes);
app.use('/todos', todoRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() =>
    app.listen(3000, () => console.log('Server running on port 3000'))
  )
  .catch((err) => console.error(err));
