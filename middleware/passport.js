const passport = require("passport");
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const LocalStrategy = require("passport-local").Strategy;
var UserModel = require("../model/index.model");

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: "lchung_jwt_secret"
    },
    function(jwtPayload, cb) {
      //find the user in db if needed
      UserModel.findOneById(jwtPayload.id)
        .then(user => {

          return cb(null, user[0]);
        })
        .catch(err => {
          return cb(err);
        });
    }
  )
);

passport.use(
  new LocalStrategy(
    {
      usernameField: "Username",
      passwordField: "Password"
    },
    function(Username, Password, cb) {
      //this one is typically a DB call. Assume that the returned user object is pre-formatted and ready for storing in JWT
      UserModel.getUser(Username)
        .then(rows => {
          var user = null;
          var id = rows[0].ID;
          console.log(id);
          if (rows[0] != null && Password === rows[0].Password) {
            user = { Username, Password, id };
          }

          // console.log(user)
          if (!user) {
            return cb(null, false, { message: "Incorrect email or password." });
          }
          return cb(null, user, { message: "Logged In Successfully" });
        })
        .catch(err => cb(err));
    }
  )
);
