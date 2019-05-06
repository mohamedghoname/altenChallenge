// const keys = require('../keys');
const { Pool } = require('pg');
const log=require("../logger");

const pgClient = new Pool({
  user: process.env.PGVICHLESUSER,
  host: process.env.PGVICHLESHOST,
  database: process.env.PGVICHLESDATABASE,
  password: process.env.PGVICHLESPASSWORD,
  port: process.env.PGVICHLESPORT
});
pgClient.on('error', () => console.log(new Error('Lost PG connection')));
// pgClient.on("connect",initializeData);

setRandomStatus();
initializeData();

function setRandomStatus() {
  setTimeout(async ()=> {
    
    var result=await pgClient.query("SELECT vin FROM vichles").catch(err=>{console.log(err)});
    result.rows.forEach(vichle => {
      if(Math.random() >= 0.5)
        ping(vichle.vin);      
    });
    setRandomStatus();
  },getRefreshRate());
}

function getRefreshRate()
{
  //Change to read from redis db to keep configurations centeralized
  return (+process.env.SIMULATION_REFRESH_RATE || 60000);
}


async function initializeData()
{    

  await pgClient
  .query('CREATE TABLE IF NOT EXISTS vichles (vin VARCHAR(100) PRIMARY KEY, customerid INT, regnr VARCHAR (100), lastpingtime VARCHAR (100))')
  .catch(err => console.log(err));

  pgClient.query("select vin from vichles limit 1")
  .then(async result=>{   
    
      if(!result.rowCount)
      {       
        await pgClient.query('INSERT INTO vichles(vin,customerId,regNr) VALUES($1,$2,$3)', ["YS2R4X20005399401",1,"ABC123"]).catch(err => console.log(err));
        await pgClient.query('INSERT INTO vichles(vin,customerId,regNr) VALUES($1,$2,$3)', ["VLUR4X20009093588",1,"DEF456"]).catch(err => console.log(err));
        await pgClient.query('INSERT INTO vichles(vin,customerId,regNr) VALUES($1,$2,$3)', ["VLUR4X20009048066",1,"GHI789"]).catch(err => console.log(err));

        await pgClient.query('INSERT INTO vichles(vin,customerId,regNr) VALUES($1,$2,$3)', ["YS2R4X20005388011",2,"JKL012"]).catch(err => console.log(err));
        await pgClient.query('INSERT INTO vichles(vin,customerId,regNr) VALUES($1,$2,$3)', ["YS2R4X20005387949",2,"MNO345"]).catch(err => console.log(err));

        await pgClient.query('INSERT INTO vichles(vin,customerId,regNr) VALUES($1,$2,$3)', ["VLUR4X20009048062",3,"PQR678"]).catch(err => console.log(err));
        await pgClient.query('INSERT INTO vichles(vin,customerId,regNr) VALUES($1,$2,$3)', ["YS2R4X20005387055",3,"STU901"]).catch(err => console.log(err));

      }
  })
  .catch(err => console.log(err));

}

async function ping(vin)
{
    let pingTime=Date.now();
    await pgClient.query(`UPDATE vichles SET lastpingtime='${pingTime}' WHERE vin=('${vin}')`)      
      .catch(err => console.log(err));
}

async function simulateOFF(vin)
{
  await pgClient.query(`UPDATE vichles SET lastpingtime=NULL WHERE vin=('${vin}')`)
  .catch(err => console.log(err));
}




module.exports={ping,initializeData,simulateOFF};