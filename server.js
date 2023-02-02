const express = require('express')
// require('dotenv').config();
const next = require('next')
const mongoose = require('mongoose');
const userRouts = require('./Routs/userRouts')
var session = require('express-session');
var MongoStore = require('connect-mongo');
var passport = require('passport');
var cookieParser = require('cookie-parser');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler()

app.prepare()
  .then(() => {
    const server = express();

    // config passport 
    require('./config/passport')(passport);

    // sessions
    server.use(session({
      secret: process.env.sessionKey,
      resave: true,
      saveUninitialized: true,
      store: MongoStore.create({
        mongoUrl: process.env.dbURI,
        collectionName: 'sessions'
      })
    }));

    // config passport midlleware
    server.use(passport.initialize());
    server.use(passport.session());

    // database connection 
    mongoose.set('strictQuery', false);
    mongoose.connect(process.env.dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
      .then((result) => console.log('db success'))
      .catch((err) => console.log(err));
    // middlewares
    server.use(express.json());
    server.use(express.urlencoded({ extended: false }));
    server.use(cookieParser());
    server.use('/api', userRouts);
    server.use(cookieParser())


    server.get('*', (req, res) => {
      return handle(req, res)
    })

    server.listen(3000, (err) => {
      if (err) throw err
      console.log('> Ready on http://localhost:3000')
    })
  })
  .catch((ex) => {
    console.error(ex.stack)
    process.exit(1)
  })