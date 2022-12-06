const express = require("express");
const router = express.Router();
const Controller = require('./controller')

router.post('/translate', Controller.doTranslate)
router.post('/speech',Controller.doSynthesizeSpeech)

module.exports = router