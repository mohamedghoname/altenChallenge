const express = require('express');
const log = require('../logger');
const router = express.Router();
const vichlesStatusController=require("../controllers/vichlesPingController")

// router.use((req, res, next) =>{ next(); });
router.use((req, res, next) =>{ next(); });

router.get('/test', (req, res) => {res.send('Ping router works');});
router.post('/',vichlesStatusController.ping);
router.post('/off',vichlesStatusController.simulateOFF);

module.exports=router;