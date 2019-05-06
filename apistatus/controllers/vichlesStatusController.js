const vichlePingRepo=require("../repos/vichleStatusRepo");
const log=require("../logger");

async function getStatuses(req, res) {
    let statuses;
    await vichlePingRepo.getStatuses().then(statuses=>{res.send(statuses);res.sendStatus(200);}).catch(err=>{log(err);res.sendStatus(500);});
    
}

async function initializeData(req, res) {
    await vichlePingRepo.initializeData().catch(err=>{log(err);});
    res.send("initializing Data...");
};

module.exports={initializeData,getStatuses};