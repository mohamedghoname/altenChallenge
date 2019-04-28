const keys = require('../keys');
const { Pool } = require('pg');
const log=require("../logger");

const pgClient = new Pool({
  user: keys.pgCustomersUser,
  host: keys.pgCustomersHost,
  database: keys.pgCustomersDatabase,
  password: keys.pgCustomersPassword,
  port: keys.pgCustomersPort
});

pgClient.on('error', () => log('Lost PG connection'));

pgClient
  .query('CREATE TABLE IF NOT EXISTS Customers (Id serial PRIMARY KEY, Name VARCHAR (100), Address VARCHAR (100))')
  .catch(err => log(err));

initializeData();

async function getAll()
{
  
  const values = await pgClient
    .query('SELECT DISTINCT * from Customers')
    .catch(err => log(err));
  
  return values.rows;
}

async function initializeData()
{
  await pgClient
    .query('INSERT INTO Customers(Name,Address) VALUES($1,$2)', ["Kalles Grustransporter AB","Cementvägen 8, 111 11 Södertälje"])
    .catch(err => log(err));

  await pgClient
    .query('INSERT INTO Customers(Name,Address) VALUES($1,$2)', ["Johans Bulk AB","Balkvägen 12, 222 22 Stockholm"])
    .catch(err => log(err));

  await pgClient
    .query('INSERT INTO Customers(Name,Address) VALUES($1,$2)', ["Haralds Värdetransporter AB","Budgetvägen 1, 333 33 Uppsala"])
    .catch(err => log(err));
}

module.exports={getAll,initializeData};