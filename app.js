const express = require('express')
const app = express()

app.get('/', function(req, res) {
  res.send('Node worker is running!')
})

app.post(
  '/init',
  function(req, res, next) {
    res.sendStatus(204)
    next()
  },
  function(req, res) {
    // TODO: must change worker's state
  }
);

app.listen(3000)
console.log('now worker is running!')
