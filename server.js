const express = require('express');
const fs = require('fs');
const { db2, Quotes } = require('./db/index.js');

const filebuffer = fs.readFileSync('db/quotes.json');

const db = JSON.parse(filebuffer);

const app = express();

app.set('port', (process.env.API_PORT || 5000));

app.use(express.json());

// --------------------
// HELPER FUNCTIONS
// --------------------
// @TODO - put into own module

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
  return quoteAdd;
}

async function getSingleQuote(quoteID) {
  try {
    const quote = await Quotes.findAll({
      where: {
        id: quoteID
      }
    });
    return quote;
  } catch (e) {
    console.log(e);
    return [];
  }
}

async function deleteSingleQuote(quoteID) {
  try {
    const quote = await Quotes.findAll({
      where: {
        id: quoteID
      }
    });
    // const result = await Quotes.destory({
    const result = await Quotes.destroy({  
      where: {
        id: quoteID
      }
    });
    return result;
  } catch (e) {
    console.log("oh no an error occurred \n", e)
    return;
  }
}

// --------------------
// ROUTES START HERE
// --------------------
// @TODO - Investigate express Router. What is that?

app.get('/api/quotes', async (req,res) => {
  // res.json(db);
  const returnValue = await getAllDBData();
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

app.delete('/api/quotes/:id', async (req,res) => {
  const deleteID = req.params.id;

  const quote = await getSingleQuote(deleteID);

  let found = false;

  if(quote && quote.length) {
    found = true; 
  }

  if(!found) {
    res.status(404).send("Quote could not be found!");
    return;
  }

  try {  
    const deleteResult = deleteSingleQuote(deleteID);
    res.status(200).send("Successfully deleted!");
  } catch (e) {
    res.status(500).send("Error occurred while deleting quote from DB.");
    return;
  }
})

export default app;
