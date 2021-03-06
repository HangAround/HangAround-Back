const express = require('express');
const {response} = require("../../../config/response");
const baseResponse = require("../../../config/baseResponseStatus");
const {verifyToken} = require("../middleware");

const router = express.Router();

router.get('', verifyToken, async (req, res) => {
    const consonant = ['ㄱ', 'ㄴ', 'ㄷ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅅ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];
    let first = Math.floor(Math.random() * consonant.length);
    let second = Math.floor(Math.random() * consonant.length);
    while (true) {
        if (second !== first)
            break;
        else
            second = Math.floor(Math.random() * consonant.length);
    }
    res.send(response(baseResponse.SUCCESS, {"consonant": consonant[first] + consonant[second]}));
});

function randomConsonant() {
    const consonant = ['ㄱ', 'ㄴ', 'ㄷ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅅ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];
    let first = Math.floor(Math.random() * consonant.length);
    let second = Math.floor(Math.random() * consonant.length);
    while (true) {
        if (second !== first)
            break;
        else
            second = Math.floor(Math.random() * consonant.length);
    }
    return consonant[first] + consonant[second];
}

module.exports = {router,randomConsonant};