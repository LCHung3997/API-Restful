var db = require('../utils/connectDB');

module.exports = {
  load: () => {
    return db.load('select * from Account');
  },
};