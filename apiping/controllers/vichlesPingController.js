const log=require("../logger");
const vichlePingRepo=require("../repos/vichlePingRepo");

async function ping(req, res) {
    if( !req.body || !req.body.vin) {        
        res.sendStatus(400);        
    }
    else
    {
        const vin= req.body.vin;
        await vichlePingRepo.ping(vin).then(()=>{res.sendStatus(200);}).catch(err=>{console.log(err);res.sendStatus(500);});
        
    }
};

async function simulateOFF(req, res) {

    if(!req.body || !req.body.vin) 
    {
        res.sendStatus(400);
        return this;
    }

    const vin= req.body.vin;
    await vichlePingRepo.simulateOFF(vin);
    res.sendStatus(200);



};

async function initializeData(req, res) {

    await vichlePingRepo.initializeData();
    res.send("initializing Data...");
};

module.exports={ping,initializeData,simulateOFF};