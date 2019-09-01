const express = require('express');
const fs = require('fs');

const filebuffer = fs.readFileSync('db/quotes.json');

const db = JSON.parse(filebuffer);

const app = express();

app.set('port', (process.env.API_PORT || 5000));

app.use(express.json());

function checkPostBody(body) {
  let message = '';
  console.log(body);
  if(!body.id ||
     !body.author ||
     !body.text ||
     !body.dateadded) {
    message = 'Invalid post content provided.';
  } else {
    message = null;
  }
  return message;
}

function writeQuote(quote) {
  db.push(quote);
  const data = JSON.stringify(db);
  fs.writeFileSync('db/quotes.json', data);
}

app.get('/api/quotes', (req,res) => {
  res.json(db);
});

app.post('/api/quotes', (req,res) => {
  let message = '';
  const jsonData = req.body;

  message = checkPostBody(jsonData);

  // If a message is returned, return the message and exit.
  if(message) {
    res.status(500).send(message);
    return;
  }

  try {    
    writeQuote(jsonData);
  } catch (e) {
    res.status(500).send("Error occurred while saving quote to DB.");
    return;
  }

  res.send("Data saved successfully!");
});

export default app;
