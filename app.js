const express = require('express')
const app = express()
const config = require('./config/config.json')

const configRequest = () => {
  app.get(config.url, function(req, res) {
    res.send('done config request!')
  })
}

app.post(
  '/init',
  function(req, res, next) {
    res.sendStatus(204)
    configRequest()
  }
);


app.listen(3000)
console.log('now worker is alive!')
