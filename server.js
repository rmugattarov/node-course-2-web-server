const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');

app.set('view-engine', 'hbs');

app.use((req, res, next) => {
  var now = new Date().toString();
  fs.appendFile('server.log', `${now}: ${req.method} ${req.url}\n`, (e) => {
    console.log(e);
  });
  next();
});
// app.use((req, res, next) => {
//   res.render('maintenance.hbs', {});
//   next();
// });
app.use(express.static(__dirname + '/static'));

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (s) => {
  return s.toUpperCase();
});

app.get('/', (req, res) => {
  res.render('home.hbs', {
    homePageText: "D'Oh!"
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page'
  });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
});
