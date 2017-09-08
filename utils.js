const request = require('request-promise')

const simulateWorkTimeout = (obj, config, fn) => {
  setTimeout(() => {
    switch (obj.workType) {
      case 1:
        config.concat--
        break
      case 2:
        config.rend--
        break
      default:
        config.preview--
        break
    }
    fn()
  }, obj.workingTime * 1000)
}

const makeRequestByObjectAndId = (obj, id) => {
  const options = {
    method: 'put',
    uri: `http://192.168.2.57:9010/api/v1/workers/${id}/state`,
    headers: {
      'User-Agent': 'nodeWorker'
    },
    json: true,
    body: obj
  }
  return request(options).then(console.log).catch(err => console.error(err))
}

const workingTimeAndTypeGenerator = () => {
  const workType = randomInteger(1, 3)
  let workingTime = 0
  switch (workType) {
    case 1:
      workingTime = generateConcatTime()
      break
    case 2:
      workingTime = generateRenderTime()
      break
    default:
      workingTime = generatePreviewTime()
      break
  }
  console.log('work Time has been generated!')
  return {
    workType: workType,
    workingTime: workingTime
  }
}

const generateConcatTime = () => {
  return randomInteger(20, 60)
}
const generateRenderTime = () => {
  return randomInteger(60, 60 * 5)
}
const generatePreviewTime = () => {
  return randomInteger(3, 10)
}

const randomInteger = (min, max) => {
  let rand = min - 0.5 + Math.random() * (max - min + 1)
  rand = Math.round(rand)
  return rand
}

module.exports = {
  workingTimeAndTypeGenerator,
  simulateWorkTimeout,
  makeRequestByObjectAndId
}
