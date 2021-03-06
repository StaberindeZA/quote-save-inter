const initConnection = async (seq) => {
  seq
    .authenticate()
    .then(() => {
      console.log('Connection has been established successfully.');
    })
    .catch(err => {
      console.error('Unable to connect to the database:', err);
    });
};

module.exports ={
  initConnection
};