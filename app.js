const path = require('path')

const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const workerConfig = require('./config/config.js').object
const workerId = require('./config/config.js').workerId
const utils = require('./utils')

app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json())

app.post(
  '/api/v1/workers/:id/boot',
  function (req, res, next) {
    res.sendStatus(204)
  })

app.post(
  '/api/v1/workers/:id/assignments',
  function (req, res, next) {
    res.status(200).json('okay!')
    let typeAndTime = utils.workingTimeAndTypeGenerator()
    switch (typeAndTime.workType) {
      case 1:
        workerConfig.concat++
        break
      case 2:
        workerConfig.rend++
        break
      default:
        workerConfig.preview++
        break
    }
    console.log('got assignment')
    console.log(workerConfig)
    utils.makeRequestByObjectAndId(workerConfig, workerId)
    .then(() => {
      return utils.simulateWorkTimeout(typeAndTime, workerConfig, () => utils.makeRequestByObjectAndId(workerConfig, workerId))
    })
  }
)

app.listen(3000)
console.log('worker is alive!')
