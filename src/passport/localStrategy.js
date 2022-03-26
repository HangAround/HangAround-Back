const passport = require('passport');
const CustomStrategy = require('passport-custom').Strategy
const {getRepository} = require("typeorm");
const {User} = require("../entities/User");

module.exports = () => {
    passport.use( 'local',new CustomStrategy( async (req,done) => {
        try {
            const userRepository = getRepository(User);
            const user = await userRepository.create({
                channel: "local"
            });

            if(user){
                await userRepository.save(user);
                done(null, user);
            }else{
                done(null, false, { message: '오류' });
            }
        } catch (error) {
            console.error(error);
            done(error);
        }
    }));
};
