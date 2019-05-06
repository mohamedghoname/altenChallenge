const CustomerRepo=require("../repos/customerRepo");
const controller=require('./customerController');
const log=require('../logger');


res = {
    sendResult:null,
    statusResult:null,
    send: function(value){this.sendResult=value },
    json: function(err){
        console.log("\n : " + err);
    },
    sendStatus: function(responseStatus) {                 
        this.statusResult=responseStatus;
        return this; 
    }
}


describe("customer Controller",()=>{
    describe("Get All Customers",()=>{
        it("Should return customers array",async ()=>{    
            CustomerRepo.getAll=jest.fn().mockResolvedValue([{id:1, name:'Customer Name'}]);
            await controller.getAllCustomers(null,res);           
            const allCustomers=res.sendResult
            expect(allCustomers.length).toBeGreaterThan(0);
            expect(allCustomers[0]).toMatchObject({id:1,name:'Customer Name'});
        });

        it("Should throw exception",async ()=>{                
            CustomerRepo.getAll=jest.fn().mockRejectedValue(new Error('Fake error'));
            await controller.getAllCustomers(null,res);            
            expect(res.statusResult).toBe(400);

        });
    })
})