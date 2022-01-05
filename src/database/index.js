const path = require('path');
const Database = require('sqlite-async')

const databasePath = path.join('src', 'database', 'database.sqlite');

async function connect() {
  return await Database.open(databasePath);
}

module.exports = { connect };