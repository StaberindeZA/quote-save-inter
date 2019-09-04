const express = require('express');
const fs = require('fs');
const { db2, Quotes } = require('./db/index.js');

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

async function getAllDBData() {
  const quoteAdd = await Quotes.findAll();
  console.log(quoteAdd);
  return quoteAdd;
}

app.get('/api/quotes', async (req,res) => {
  // res.json(db);
  const returnValue = await getAllDBData();
  console.log(returnValue);
  res.send(returnValue);
});

app.post('/api/quotes', async (req,res) => {
  let message = '';
  const jsonData = req.body;

  message = checkPostBody(jsonData);

  // If a message is returned, return the message and exit.
  if(message) {
    res.status(500).send(message);
    return;
  };

  try {    
    writeQuote(jsonData);
  } catch (e) {
    res.status(500).send("Error occurred while saving quote to DB.");
    return;
  };

  res.send("Data saved successfully!");
});

app.delete('/api/quotes/:id', (req,res) => {
  const deleteID = req.params.id;

  console.log("Delete ID:", deleteID);

  const found = db.find((entry) => {
    return entry.id === deleteID;
  });

  console.log("Found: ",found);

  if(!found) {
    res.status(404).send("Quote could not be found!");
    return;
  }

  try {  
    const newDB = db.filter(entry => entry.id !== deleteID);
    const data = JSON.stringify(newDB);  
    fs.writeFileSync('db/quotes.json', data);
    res.status(200).send("Succeessfully deleted");
  } catch (e) {
    res.status(500).send("Error occurred while saving quote to DB.");
    return;
  }
})

export default app;
