const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const logger = require('morgan');

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

const allowedOrigins = ['https://videogame-library.netlify.app'];

app.use(
  cors({
    origin: allowedOrigins,
    methods: 'GET, POST, PUT, DELETE',
    credentials: true,
  })
);
app.use(express.json());
app.use(logger('dev'));

const authRouter = require('./controllers/auth');
const usersRouter = require('./controllers/users');
const consolesRouter = require('./controllers/consoles');
const gamesRouter = require('./controllers/games');
app.use('/auth', authRouter);
app.use('/users', usersRouter);
app.use('/consoles', consolesRouter);
app.use('/games', gamesRouter);

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port 3000`);
});
