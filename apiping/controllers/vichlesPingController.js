const vichlePingRepo=require("../repos/vichlePingRepo");


async function getStatuses(req, res) {
    var statuses= await vichlePingRepo.getStatuses();

    res.send(statuses);
}

async function ping(req, res) {
    if(!req.body || !req.body.vin) res.statuses(400);

    const vin= req.body.vin;
    await vichlePingRepo.ping(vin).catch(err=>{console.log(err);});

    res.sendStatus(200);
};

async function simulateOFF(req, res) {
    if(!req.body || !req.body.vin) res.statuses(400);

    const vin= req.body.vin;
    await vichlePingRepo.simulateOFF(vin);
    res.sendStatus(200);
};

async function initializeData(req, res) {

    await vichlePingRepo.initializeData();
    res.send("initializing Data...");
};

module.exports={ping,initializeData,simulateOFF};