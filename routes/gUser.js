const GoogleStrategy= require('passport-google-oauth').OAuth2Strategy;
const config        = require('../jwtconfig.json')
module.exports = (passport) => {
    passport.serializeUser((user, done) => {
        done(null, user);
    });

    passport.deserializeUser((user, done) => {
        done(null, user);
    });

    passport.use(new GoogleStrategy({
            clientID: config.gClientId,
            clientSecret: config.gClientSecret,
            callbackURL: '/api/gCallback'
        },
        (token, refreshToken, profile, done) => {
            console.log(profile)
            return done(null, {
                profile: profile,
                token: token
            });
        }));
};