const KakaoStrategy = require('passport-kakao').Strategy;

const {User} = require('../entities/User');
const { getRepository } = require("typeorm");

module.exports = (passport) => {
    passport.use(new KakaoStrategy({
        clientId: process.env.KAKAO_ID,
        callbackURL: '/auth/kakao/callback',
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            const userRepository = getRepository(User);
            const exUser = await userRepository.findOne({snsId: profile.id, channel: 'kakao'});
            if (exUser) {
                console.log(exUser);
                done(null, exUser);
            } else {
                const newUser = await userRepository.create({
                    snsId: profile.id,
                    userName: profile.displayName,
                    channel: 'kakao',
                });
                console.log(newUser);
                done(null, newUser);
            }
        } catch (error) {
            console.error(error);
            done(error);
        }
    }))
}