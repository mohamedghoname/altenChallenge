const express = require('express');
const router = express.Router();
const customerController=require("../controllers/customerController")

router.use((req, res, next) => {  
  next();
});

router.get('/test', (req, res) => {res.send('Customer router works');});
router.get('/',customerController.getAllCustomers);
router.get('/init',customerController.initializeData);

module.exports=router;