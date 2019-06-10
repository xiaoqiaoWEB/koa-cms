let fs = require('fs')
let events = require('events')

let EventEmitter = new events.EventEmitter()


getMime() 

function getMime() {
  fs.readFile('mime.json', (err, data) => {
    EventEmitter.emit('to_data', data)
  })
}

EventEmitter.on('to_data', (data) => {
  console.log(data.toString())
})
