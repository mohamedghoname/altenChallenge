const vichlePingRepo=require("../repos/vichlePingRepo");
const vichlePingRoutes = require('./vichlePingRoutes');
const express = require('express');
const request = require('supertest');
const bodyParser = require('body-parser');

const initializeApplication = () => {
  
  const app = express();
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(vichlePingRoutes);
  return app;
}

describe('GET /test', () => {    
  it('should return Ping router works', async () => {   
    const app = initializeApplication();
    
    let req=await request(app).get('/test');
    
    expect(req.text).toBe('Ping router works');
    expect(req.status).toBe(200);    
  });
 
});


describe('POST /', () => {
    it('should return 200 OK', async() => {
        vichlePingRepo.ping=jest.fn().mockResolvedValue();
        const app = initializeApplication();        
        
        let req=await request(app).post('/').send({'vin':'VLUR4X20009048066'}).expect(200).end();
        
        // expect(req.status).toBe(200);



        
    });
});