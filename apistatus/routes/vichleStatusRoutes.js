const express = require('express');
const log = require('../logger');
const router = express.Router();
const vichlesStatusController=require("../controllers/vichlesStatusController")

// router.use((req, res, next) =>{ next(); });
router.use((req, res, next) =>{ next(); });

router.get('/test', (req, res) => {res.send('Ping router works');});
router.get('/init',vichlesStatusController.initializeData);
router.get('/',vichlesStatusController.getStatuses);

module.exports=router;