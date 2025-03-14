const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const logger = require('morgan');
const port = process.env.PORT;

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

app.use(cors());
app.use(express.json());
app.use(logger('dev'));

const testJwtRouter = require('./controllers/test-jwt');
const authRouter = require('./controllers/auth');
const usersRouter = require('./controllers/users');
const consolesRouter = require('./controllers/consoles');
const gamesRouter = require('./controllers/games');
// Routes go here
//CHANGE THESE ROUTES
app.use('/auth', authRouter);
// app.use('/test-jwt', testJwtRouter);
app.use('/users', usersRouter);
app.use('/consoles', consolesRouter);
app.use('/games', gamesRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
