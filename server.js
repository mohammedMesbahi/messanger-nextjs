const express = require('express')
require('dotenv').config();
const next = require('next')
const mongoose  = require('mongoose');
const userRouts = require('./Routs/userRouts')
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev });
const handle = app.getRequestHandler()

app.prepare()
.then(() => {
  const server = express()
  // database connection 
  mongoose.set('strictQuery', false);
  mongoose.connect(process.env.dbURI, { useNewUrlParser: true, useUnifiedTopology: true})
  .then((result) => console.log('db success'))
  .catch((err) => console.log(err));
  // middlewares
  server.use(express.json());
  server.use('/api',userRouts);

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