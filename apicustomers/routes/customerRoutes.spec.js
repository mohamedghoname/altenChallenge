const CustomerRepo=require("../repos/customerRepo");
const customerRoutes = require('./customerRoutes');
const express = require('express');
const request = require('supertest');

const initializeApplication = () => {
  const app = express();
  app.use(customerRoutes);
  return app;
}

describe('GET /test', () => {    
  it('should return Customer router works', async () => {   
    const app = initializeApplication();
    
    let req=await request(app).get('/test');
    
    expect(req.text).toBe('Customer router works');
    expect(req.status).toBe(200);    
  });
 
});
describe('GET /', () => {
    it('should return Customers array', async () => {   
        CustomerRepo.getAll=jest.fn().mockResolvedValue([{id:1, name:'Customer Name'}]);
        const app = initializeApplication();
        let req=await request(app).get('/');
        expect(JSON.parse(req.text)[0]).toMatchObject({id:1,name:'Customer Name'});       
    });
});