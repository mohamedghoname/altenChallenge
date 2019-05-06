const vichlePingRepo=require("../repos/vichlePingRepo");
const controller=require('./vichlesPingController');


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




describe("Vehicles Controller",()=>{
    describe("Ping vehicle",()=>{
        it("Should return 400 error if Body is invalid",async ()=>{    
            req={body:null}            
            await controller.ping(req,res);           
            const status =res.statusResult
            expect(status).toBe(400);
            
        });

        it("Should return 400 error if Vin is invalid",async ()=>{    
            req={body:{vin:null}}
            await controller.ping(req,res);           
            const status =res.statusResult
            expect(status).toBe(400);
            
        });

        it("Should return 200 if Vin is valid",async ()=>{    
            vichlePingRepo.ping = jest.fn().mockResolvedValue();
            req={body:{vin:"1234"}};
            await controller.ping(req,res);           
            const status =res.statusResult
            expect(status).toBe(200);
            
        });

        it("Should Log exception",async ()=>{    
            vichlePingRepo.ping = jest.fn().mockRejectedValue(new Error("Fake Error"));
            req={body:{vin:"1234"}};      

            await controller.ping(req,res);    
            expect(res.statusResult).toBe(500);                        
        });

    })
})