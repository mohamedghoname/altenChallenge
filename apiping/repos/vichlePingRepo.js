const keys = require('../keys');
const { Pool } = require('pg');
const log=require("../logger");

const pgClient = new Pool({
  user: keys.pgVichlesUser,
  host: keys.pgVichlesHost,
  database: keys.pgVichlesDatabase,
  password: keys.pgVichlesPassword,
  port: keys.pgVichlesPort
});
pgClient.on('error', () => log(new Error('Lost PG connection')));
// pgClient.on("connect",initializeData);

setRandomStatus();
async function setRandomStatus(params) {  
  setInterval(async () => {
    
    var result=await pgClient.query("SELECT vin FROM vichles").catch(err=>{log(err)});
    result.rows.forEach(vichle => {
      if(Math.random() >= 0.5)
        ping(vichle.vin);      
    });
  }, 6000);

}


async function initializeData()
{
  await pgClient
  .query('CREATE TABLE IF NOT EXISTS vichles (vin VARCHAR(100) PRIMARY KEY, customerId INT, regNr VARCHAR (100), lastpingtime VARCHAR (100))')  
  .catch(err => log(err));

  pgClient.query("select vin from vichles limit 10")
  .then(result=>{          
      if(!result.rowCount)
      {
        pgClient.query('INSERT INTO vichles(vin,customerId,regNr) VALUES($1,$2,$3)', ["YS2R4X20005399401",1,"ABC123"]).catch(err => log(err));
        pgClient.query('INSERT INTO vichles(vin,customerId,regNr) VALUES($1,$2,$3)', ["VLUR4X20009093588",1,"DEF456"]).catch(err => log(err));
        pgClient.query('INSERT INTO vichles(vin,customerId,regNr) VALUES($1,$2,$3)', ["VLUR4X20009048066",1,"GHI789"]).catch(err => log(err));

        pgClient.query('INSERT INTO vichles(vin,customerId,regNr) VALUES($1,$2,$3)', ["YS2R4X20005388011",2,"JKL012"]).catch(err => log(err));
        pgClient.query('INSERT INTO vichles(vin,customerId,regNr) VALUES($1,$2,$3)', ["YS2R4X20005387949",2,"MNO345"]).catch(err => log(err));

        pgClient.query('INSERT INTO vichles(vin,customerId,regNr) VALUES($1,$2,$3)', ["VLUR4X20009048062",3,"PQR678"]).catch(err => log(err));
        pgClient.query('INSERT INTO vichles(vin,customerId,regNr) VALUES($1,$2,$3)', ["YS2R4X20005387055",3,"STU901"]).catch(err => log(err));

      }
  })
  .catch(err => log(err));  
}

async function ping(vin)
{                      
    await pgClient.query(`UPDATE vichles SET lastpingtime='${Date.now()}' WHERE vin=('${vin}')`)      
      .catch(err => log(err));    
}

async function simulateOFF(vin)
{  
  await pgClient.query(`UPDATE vichles SET lastpingtime=NULL WHERE vin=('${vin}')`)  
  .catch(err => log(err));  
}




module.exports={ping,initializeData,simulateOFF};