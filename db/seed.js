const Sequelize = require('sequelize');

const sequelize = new Sequelize('postgres://postgres:Big4Pass6ForNow!@localhost:5432/quote_store');
const Model = Sequelize.Model;

const initConnection = async () => {
  sequelize
    .authenticate()
    .then(() => {
      console.log('Connection has been established successfully.');
    })
    .catch(err => {
      console.error('Unable to connect to the database:', err);
    });
};

class Quotes extends Model {};

const initModels = () => {
  Quotes.init({
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    author: {
      type: Sequelize.STRING,
      allowNull: false
    },
    text: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    dateadded: {
      type: Sequelize.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'quotes'
  });
}

const seedData = async () => {
  await initConnection();

  initModels();

  Quotes.sync({ force: true }).then(() => {
    return Quotes.create({
      author: 'Better',
      text: 'Than now',
      dateadded: new Date()
    });
  }).then(() => {
    return Quotes.findAll().then(quote => {
      console.log("All users:", JSON.stringify(quote, null, 4));
    }).then(() => {
      sequelize.close()
        .then(() => console.log("Connection closed!!!!"));
    })
  });

}

seedData();


