const vichleStatusRepo=require("../repos/vichleStatusRepo");
const controller=require('./vichlesStatusController');


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




describe("Vehicles Status Controller",()=>{
    describe("Ping vehicle",()=>{     

        it("Should return 200 if Vin is valid",async ()=>{    
            vichleStatusRepo.getStatuses = jest.fn().mockResolvedValue([
                {'vin':'VLUR4X20009048062', 'status':true, 'customerId':1},
                {'vin':'VLUR4X20009093588', 'status':false, 'customerId':1}
            ]);
            
            await controller.getStatuses(null,res);           
            const result =res.sendResult
            expect(Array.isArray(result)).toBe(true);
            expect(result.length).toBeGreaterThan(0);
            expect(result[0]).toMatchObject({'vin':'VLUR4X20009048062', 'status':true, 'customerId':1});
            expect(res.statusResult).toBe(200);            
        });

        it("Should Log exception",async ()=>{    
            vichleStatusRepo.getStatuses = jest.fn().mockRejectedValue(new Error("Fake Error"));            

            await controller.getStatuses(null,res);    
            expect(res.statusResult).toBe(500);                        
        });



    })
})