const express = require('express');
const nunjucks = require('nunjucks');
const path = require('path');
const moment = require('moment');
const bodyParser = require('body-parser');

const app = express();

nunjucks.configure('views', {
  autoescape: true,
  express: app,
});

app.set('view engine', 'njk');
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.urlencoded({ extended: false }));

const verificaDados = (req, res) => {
  if ((req.body.nome || req.body.idade) === undefined) {
    res.redirect('/');
  }
  else{
    next();
  }
};

app.get('/', (req, res) => {
  res.render('main');
});

app.get('/major?nome&idade', verificaDados, (req, res) => {
  res.render('major', { nome: req.query.nome });
});

app.get('/minor', verificaDados, (req, res) => {
  res.render('minor', { nome: req.query.nome });
});

app.post('/check', (req, res) => {
  if ( !req.body.nome || !req.body.data ) {
    res.redirect('/');
  }
  const { nome, data } = req.body;
  const idade = moment().diff(moment(data, 'DD/MM/YYYY'), 'years');
  if (idade >= 18) {
    res.redirect(`/major?nome=${nome}`);
  } else if (idade < 18) {
    res.redirect(`/minor?nome=${nome}`);
  }
});

app.listen(3000);
