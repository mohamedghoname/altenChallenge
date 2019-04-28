const log=require("../logger")
const CustomerRepo=require("../repos/customerRepo");

async function getAllCustomers(req, res) {
    const allCustomers=await CustomerRepo.getAll().catch(err=>{log(err);
    });
    res.send(allCustomers);
};

async function initializeData(req, res) {
    await CustomerRepo.initializeData();
    res.send("Data initialized");
};

module.exports={getAllCustomers,initializeData};