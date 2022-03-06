const express = require('express');
const router = express.Router();

router.get('/new_room', function(req, res, next) {
    res.send('respond with a resource');
  });

module.exports = router;