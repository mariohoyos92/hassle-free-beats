const express = require("express");
const { json } = require("body-parser");
const cors = require("cors");
const session = require("express-session");
const massive = require("massive");
const passport = require("passport");
const Auth0Strategy = require("passport-auth0");
require("dotenv").config();

//CONFIG VARIABLES BELOW
const { secret } = require("../config").session;

const { domain, clientID, clientSecret } = require("../config").auth0;

const port = process.env.PORT || 3001;

const app = express();

// app.use(express.static(`__dirname/build`));

app.use(
  session({
    secret,
    resave: false,
    saveUninitialized: false
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
      callbackURL: "http://localhost:3000/"
    },
    function(accessToken, refreshToken, extraParams, profile, done) {
      return done(null, profile);
    }
  )
);

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

app.get(
  "/api/login",
  passport.authenticate("auth0", {
    successRedirect: "http://localhost:3000/"
  })
);

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
