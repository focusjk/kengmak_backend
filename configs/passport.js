const passport = require('passport')
const UserService = require('../services/user');
const passportJWT = require("passport-jwt")
const JWTStrategy = passportJWT.Strategy
const ExtractJWT = passportJWT.ExtractJwt
const { TOKEN_KEYWORD } = require('../util/constant');

passport.use(new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password'
},
function (username,password,cb){
  return UserModel.findOne({username,password}).then(user => {
    if (!user) {
      return cb(null, false, {message:'Incorrect username or password.'});
    }
    return cb(null, user, {message:'Logged in success'});
  })
  .catch(err => cb(err));
}));

passport.use(new JWTStrategy({
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: TOKEN_KEYWORD
},
  (jwtPayload, cb) => {
    const { _id } = jwtPayload
    return UserService.find({ _id })
      .then(user => {
        return cb(null, user[0]);
      })
      .catch(err => {
        return cb(err);
      });
  }
));

