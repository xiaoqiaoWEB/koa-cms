const express = require('express')

const app = new express();

app.get('/news', (req, res, next) => {

  console.log('news')
  next();
})

app.get('/news', (req, res) => {
  res.send('news')
})


app.listen(1111)