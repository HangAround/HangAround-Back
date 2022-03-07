const express = require('express');
const router = express.Router();

router.post('/kakao',(req,res)=>{
    res.send("kakao login 구현중");
});

router.get('/test',(req,res)=>{

});

module.exports = router;