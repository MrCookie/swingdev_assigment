const express = require('express');
const router = express.Router();
var path = require('path');

router.get('/prices', function (req, res, next) {
  res.sendFile(path.join(__dirname + '/../public/prices.pdf'));
});

module.exports = router;
