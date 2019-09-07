const { db, Quotes } = require('./index');
const uuid = require('uuid');

const seedData = async () => {
  const quoteSync = await Quotes.sync({force: 'true'});
  const quoteAdd = await Quotes.create({
    id: uuid.v4(),
    author: 'Jack Jackson',
    text: 'All the great things that were said',
    dateadded: new Date()
  });
  db.close();
};

seedData();
