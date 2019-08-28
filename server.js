const express = require('express');
const fs = require('fs');

const filebuffer = fs.readFileSync('db/quotes.json');

const db = JSON.parse(filebuffer);

const app = express();

app.set('port', (process.env.API_PORT || 5000));

app.use(express.json());

app.get('/api/quotes', (req,res) => {
  res.json(db);
});

app.post('/api/quotes', (req,res) => {
  console.log(db);
  db.push(req.body[0]);
  let data = JSON.stringify(db);
  fs.writeFileSync('db/quotes.json', data);
  res.send(req.body);
});

export default app;
