const express = require('express')
const app = express()
const config = require('./config/config.json')
const request = require('request-promise')
const bodyParser = require('body-parser')
const path = require('path')

app.use(express.static(path.join(__dirname, 'public')))

app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json())

const makeRequest = () => {
  const options = {
    method: 'put',
    uri: 'http://192.168.2.57:9010/api/v1/workers/1/state',
    headers: {
      'User-Agent': 'nodeWorker'
    },
    json: true,
    body: {
      config: config
    }
  }
  return request(options)
}

app.post(
  '/api/v1/workers/:id/boot',
  function (req, res, next) {
    res.sendStatus(204)
    makeRequest()
  })

app.post(
  '/api/v1/workers/:id/assignments',
  function (req, res, next) {
    res.status(200).json('sdsjakdnkjasdh')
    console.log(req.body)
  }
)

app.listen(3000)
console.log('now worker is booting!')
