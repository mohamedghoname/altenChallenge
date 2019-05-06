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



initializeData();


async function initializeData()
{
  
  

  await pgClient
  .query('CREATE TABLE IF NOT EXISTS vichles (vin VARCHAR(100) PRIMARY KEY, customerid INT, regnr VARCHAR (100), lastpingtime VARCHAR (100))')
  .catch(err => log(err));

  pgClient.query("select vin from vichles limit 1")
  .then(async result=>{      
    
      if(!result.rowCount)
      {       
        await pgClient.query('INSERT INTO vichles(vin,customerId,regNr) VALUES($1,$2,$3)', ["YS2R4X20005399401",1,"ABC123"]).catch(err => log(err));
        await pgClient.query('INSERT INTO vichles(vin,customerId,regNr) VALUES($1,$2,$3)', ["VLUR4X20009093588",1,"DEF456"]).catch(err => log(err));
        await pgClient.query('INSERT INTO vichles(vin,customerId,regNr) VALUES($1,$2,$3)', ["VLUR4X20009048066",1,"GHI789"]).catch(err => log(err));

        await pgClient.query('INSERT INTO vichles(vin,customerId,regNr) VALUES($1,$2,$3)', ["YS2R4X20005388011",2,"JKL012"]).catch(err => log(err));
        await pgClient.query('INSERT INTO vichles(vin,customerId,regNr) VALUES($1,$2,$3)', ["YS2R4X20005387949",2,"MNO345"]).catch(err => log(err));

        await pgClient.query('INSERT INTO vichles(vin,customerId,regNr) VALUES($1,$2,$3)', ["VLUR4X20009048062",3,"PQR678"]).catch(err => log(err));
        await pgClient.query('INSERT INTO vichles(vin,customerId,regNr) VALUES($1,$2,$3)', ["YS2R4X20005387055",3,"STU901"]).catch(err => log(err));

      }
  })
  .catch(err => log(err));

}


async function getStatuses()
{        
    var vichles=await pgClient
      .query(`Select vin, lastpingtime, customerid from vichles`)      
      .catch(err => log(err));

    if(!vichles.rows) return [];
    const rows=[];
    
    
    await vichles.rows.forEach(vichle => 
      rows.push({vin:vichle.vin, status:evaluateStatus(vichle),customerId:vichle.customerid})
      );    
      console.log(rows);
      
    return rows;
}

function evaluateStatus(vichle) {   
  return  !!(vichle.lastpingtime && ((Date.now() - parseFloat(vichle.lastpingtime)) < getRefreshRate()));
}


function getRefreshRate()
{
  //Change to read from redis db to keep configurations centeralized
  return (+process.env.SIMULATION_REFRESH_RATE || 60000);
}

module.exports={initializeData,getStatuses};