const express = require('express');
const router = express.Router();

const subscribeController = require("../controllers/subscribeController");

router.get("/", subscribeController.getAllSubscribes);
router.post("/", subscribeController.createSubscribe);
module.exports = router;