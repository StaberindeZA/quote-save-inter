const Sequelize = require('sequelize');
const db = require('../connection');

// module.exports = (sequelize, DataTypes) => {
//   return sequelize.define('quotes', {
//     id: {
//       type: DataTypes.UUID,
//       defaultValue: DataTypes.UUIDV4,
//       allowNull: false,
//       primaryKey: true
//     },
//     author: {
//       type: DataTypes.STRING,
//       allowNull: false
//     },
//     text: {
//       type: DataTypes.TEXT,
//       allowNull: false
//     },
//     dateadded: {
//       type: DataTypes.DATE,
//       allowNull: false
//     }
//   })
// };

const Quotes = db.define('quotes', {
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
});

module.exports = Quotes;