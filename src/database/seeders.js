const fs = require('fs');
const path = require('path');

const User = require('../models/User.js');

async function up() {
  const seedersPath = path.join('src', 'database', 'seeders.json');

  const seedersContent = fs.readFileSync(seedersPath);

  const seeders = JSON.parse(seedersContent);

  for (const user of seeders.users) {
    await User.load(user);
  }

}

module.exports = { up };