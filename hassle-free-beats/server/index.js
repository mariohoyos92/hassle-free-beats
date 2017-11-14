const express = require("express");
const { json } = require("body-parser");
const cors = require("cors");
const session = require("express-session");
const massive = require("massive");
const passport = require("passport");
const Auth0Strategy = require("passport-auth0");
require("dotenv").config();

// CONFIG VARIABLES BELOW

const { secret } = require("../config").session;
const { domain, clientID, clientSecret } = require("../config").auth0;

const port = process.env.PORT || 3001;

// BEGIN SERVER

const app = express();

// app.use(express.static(`__dirname/build`));

app.use(
  session({
    secret,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60000 }
  })
);

massive(process.env.CONNECTION_STRING)
  .then(db => app.set("db", db))
  .catch(console.log);

app.use(json());
app.use(cors());

app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new Auth0Strategy(
    {
      domain,
      clientID,
      clientSecret,
      callbackURL: "/api/login"
    },
    function(accessToken, refreshToken, extraParams, profile, done) {
      app
        .get("db")
        .getUserByUserId([profile._json.user_id])
        .then(response => {
          if (!response[0]) {
            app
              .get("db")
              .createUserFromAuth([profile._json.user_id, profile._json.email])
              .then(created => {
                return done(null, created[0]);
              });
          } else {
            return done(null, response[0]);
          }
        });
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

app.get(
  "/api/login",
  passport.authenticate("auth0", {
    successRedirect: "http://localhost:3000/dashboard"
  })
);

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
