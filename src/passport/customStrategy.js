const passport = require('passport');
const CustomStrategy = require('passport-custom').Strategy
const {getRepository} = require("typeorm");
const {User} = require("../entities/User");

module.exports = () => {
    passport.use('custom', new CustomStrategy(async (req, done) => {
        try {
            const userRepository = getRepository(User);
            const user = await userRepository.findOne(req.params.userId);
            if (user) {
                done(null, user);
            } else {
                done(null, false, {message: '오류'});
            }
        } catch (error) {
            console.error(error);
            done(error);
        }
    }));
};
