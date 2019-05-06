const express = require('express');
const log = require('../logger');
const router = express.Router();
const vichlesPingController=require("../controllers/vichlesPingController")
 

router.use((req, res, next) =>{ next(); });

router.get('/test', (req, res) => {res.send('Ping router works');});
router.post('/',vichlesPingController.ping);
router.post('/off',vichlesPingController.simulateOFF);
router.post('/status',vichlesPingController.getStatuses);

module.exports=router;