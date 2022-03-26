const passport = require('passport');
const kakao = require('./kakaoStrategy');
const local = require('./localStrategy');
const {User} = require('../entities/User');
const {getRepository} = require("typeorm");

module.exports = () => {
    //두 번째 인자 user를 전달 받아 세션(req.session.passport.user)에 저장
    passport.serializeUser((user, done) => {
        done(null, user.userId);
    });

    //서버로 들어오는 요청마다 세션정보를 실제 DB와 비교
    //해당 유저 정보가 있으면 done을 통해 req.user에 사용자 전체 정보를 저장
    passport.deserializeUser(async (id, done) => {
        const userRepository = getRepository(User);
        await userRepository.findOne({
            where: {userId: id}
        })
            .then(user => done(null, user))
            .catch(err => done(err));
    });

    local();
    kakao();
};