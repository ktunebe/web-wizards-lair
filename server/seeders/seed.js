const db = require('../config/connection');
const { User, Problem } = require('../models');
const cleanDB = require('./cleanDB');
const userSeeds = require('./userSeeds.json');
const problemSeeds = require('./problemSeeds.json')

db.once('open', async () => {
  try {
    await cleanDB('User', 'users')
    await User.create(userSeeds);
    await Problem.create(problemSeeds);

    console.log('all done!');
    process.exit(0);
  } catch (err) {
    throw err;
  }
});
