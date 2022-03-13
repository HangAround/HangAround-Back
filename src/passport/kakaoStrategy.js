const passport = require('passport');
const kakaoStrategy = require('passport-kakao').Strategy;

const {User} = require('../entities/User');
const {getRepository} = require("typeorm");

module.exports = () => {
    passport.use(new kakaoStrategy({
        clientID: process.env.KAKAO_ID,
        callbackURL: '/auth/kakao/callback',
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            const userRepository = getRepository(User);
            const exUser = await userRepository.findOne({where: {snsId: profile.id, channel: "kakao"}});
            console.log('exUser: ' + exUser);
            if (exUser != undefined) {
                done(null, exUser);
            } else {
                const newUser = await userRepository.create({
                    snsId: profile.id,
                    userName: profile.displayName,
                    channel: 'kakao',
                });
                console.log('newUser ' + newUser);
                await userRepository.save(newUser);
                done(null, newUser);
            }
        } catch (error) {
            console.error(error);
            done(error);
        }
    }));
};