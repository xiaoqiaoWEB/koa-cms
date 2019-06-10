let express = require('express')

let app = new express();

app.get('/', (req, res) => {
  res.send('success')
})

app.get('/new', (req, res) => {
  res.send('new')
})

app.get('/new/:id', (req, res) => {

  let id = req.params.id

  res.send('new-------' + id)
})


app.get('/about', (req, res) => {
  let data = req.query;
  console.log(req.queryy)
  res.send('new get ----- '+ data);
})

app.listen(3000,'127.0.0.1')