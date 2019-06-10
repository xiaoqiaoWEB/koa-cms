const fs = require('fs')

function getMIme() {
  fs.readFile('mime.json', (err, data) => {
    return data
  })
}

console.log(getMIme()) //undefined