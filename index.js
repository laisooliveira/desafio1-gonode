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
    res.render('main');
  }
};

app.get('/', (req, res) => {
  res.render('main');
});

app.get('/major', verificaDados, (req, res) => {
  res.render('major', {});
});

app.get('/minor', verificaDados, (req, res) => {
  res.render('minor');
});

app.post('/check', (req, res) => {
  const { nome, data } = req.body;
  const idade = moment().diff(moment(data, 'DD/MM/YYYY'), 'years');
  if (idade >= 18) {
    res.render('major', { nome, idade });
  } else if (idade < 18) {
    res.render('minor', { nome, idade });
  }
});

app.listen(3000);
