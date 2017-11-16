const express = require("express");
const { json } = require("body-parser");
const cors = require("cors");
const session = require("express-session");
const massive = require("massive");
const passport = require("passport");
const Auth0Strategy = require("passport-auth0");

require("dotenv").config();

// IMPORT CONTROLLERS
const cartController = require("./controllers/cart_controller");

// CONFIG VARIABLES BELOW
const { secret } = require("../config").session;
const { domain, clientID, clientSecret } = require("../config").auth0;
const { publishableKey, secretKey } = require("../config").stripe;

const port = process.env.PORT || 3001;

// BEGIN SERVER

const app = express();

// app.use(express.static(`__dirname/build`));
const stripe = require("stripe")(secretKey);

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

// AUTHORIZATION
app.get(
  "/api/login",
  passport.authenticate("auth0", {
    successRedirect: "http://localhost:3000/dashboard"
  })
);

// BEATS
app.get("/api/beats", (req, res) => {
  app
    .get("db")
    .getPlaylist()
    .then(response => res.status(200).json(response))
    .catch(res.status(500));
});
// DASHBOARD
app.get("/api/purchases", (req, res) => {
  console.log(req.session);
  if (req.session.purchases && req.session.paid) {
    res.status(200).json(req.session.purchases);
  } else {
    res.status(500).json("Nothing in purchases");
  }
});

// CART
app.get("/api/cart", cartController.get);
app.post("/api/cart", cartController.add);
app.delete("/api/cart/:title", cartController.delete);

// CHECKOUT
app.post("/api/charge", (req, res) => {
  stripe.charges.create(req.body, (stripeErr, stripeRes) => {
    if (stripeErr) {
      res.status(500).send({ error: stripeErr });
    } else {
      req.session.paid = true;
      req.session.purchases = req.session.cart.tracks;
      delete req.session.cart;
      res.redirect(200, "/dashboard");
    }
  });
});

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
