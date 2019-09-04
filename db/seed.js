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

// const writeSingleQuote = (quote) => {
//   await common.initConnection(sequelize);

//   Quotes.sync({ force: true })
//     .then(() => {
//       return Quotes.create({
//         id: quote.id,
//         author: quote.author,
//         text: quote.text,
//         dateadded: quote.dateadded
//       });
//     })
//       .then(() => {
//         sequelize.close()
//           .then(() => console.log("Connection closed!!!!"));
//       });
// };

// const readAllQuotes = () => {
//   await common.initConnection(sequelize);

//   Quotes.sync({ force: false })
//     .then(() => {
//       return Quotes.findAll().then(quote => {
        
//         // console.log("All users:", JSON.stringify(quote, null, 4));
//       }).then(() => {
//         sequelize.close()
//           .then(() => console.log("Connection closed!!!!"));
//       })
//     });
// };

// module.exports = {
//   seedData,
//   writeSingleQuote,
//   readAllQuotes
// };


