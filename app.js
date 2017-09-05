const express = require('express')
const app = express()
const config = require('./config/config.json')
const request = require('request-promise')

const makeRequest = () => {
  const options = {
    method: 'put',
    uri: 'http://192.168.2.57:9010/api/v1/workers/1/state',
    headers: {
      'User-Agent': 'nodeWorker'
    },
    json: true
  }
  return request(options)
}

app.post(
  '/api/v1/workers/:id/boot',
  function (req, res, next) {
    res.sendStatus(204)
    makeRequest()
  }
)

app.listen(3000)
console.log('now worker is booting!')
