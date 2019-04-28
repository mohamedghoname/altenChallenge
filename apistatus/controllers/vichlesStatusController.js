const vichlePingRepo=require("../repos/vichleStatusRepo");
const log=require("../logger");

async function getStatuses(req, res) {
    var statuses= await vichlePingRepo.getStatuses().catch(err=>{log(err);});
    res.send(statuses);      
}

async function initializeData(req, res) {
    await vichlePingRepo.initializeData().catch(err=>{log(err);});
    res.send("initializing Data...");
};

module.exports={initializeData,getStatuses};