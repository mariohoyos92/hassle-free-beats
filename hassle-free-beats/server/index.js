require("dotenv").config();
const express = require("express");
const { json } = require("body-parser");
const cors = require("cors");
const session = require("express-session");
const massive = require("massive");
const passport = require("passport");
const Auth0Strategy = require("passport-auth0");
// const mailgun = require("mailgun-js")({
//   apiKey: process.env.MAILGUN_KEY,
//   domain: process.env.MAILGUN_SECRET
// });

// IMPORT CONTROLLERS
const beatsController = require('./controllers/beats_controller');
const cartController = require("./controllers/cart_controller");
const authController = require("./controllers/authorization");
const emailController = require("./controllers/email");

// BEGIN SERVER
const app = (module.exports = express());

// SERVE FRONTEND
app.use(express.static(`${__dirname}/../build`));

// INITIALIZE SESSION
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  })
);

// CONNECT TO DATABASE
massive(process.env.DATABASE_URL)
  .then(db => app.set("db", db))
  .catch(console.log);

app.use(json());
app.use(cors());

app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new Auth0Strategy(
    {
      domain: process.env.AUTH0_DOMAIN,
      clientID: process.env.AUTH0_CLIENTID,
      clientSecret: process.env.AUTH0_CLIENTSECRET,
      callbackURL: "/api/login"
    },
    getOrCreatUser
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
    successRedirect: "https://www.hasslefreebeats.com/dashboard"
  })
);
app.get("/api/logstatus", authController.checkLogStatus);
app.get("/api/logout", authController.logout);

// GET BEATS FOR MUSIC STORE
app.get("/api/beats", beatsController.getPlaylistFromDb);

// SEND CONTACT-ME FORM EMAIL
app.post("/api/contact", emailController.contactForm);

// USER DASHBOARD
app.get("/api/pastpurchases", beatsController.getPastPurchasesFromDb);

// SUCCESSFUL PAYMENT PAGE
app.get("/api/purchases", beatsController.getNewPurchasedTracks);

// CART
app.get("/api/cart", cartController.get);
app.post("/api/cart", cartController.add);
app.delete("/api/cart/:title", cartController.delete);

// CHECKOUT
app.post("/api/charge", beatsController.postSaleToDbAndRedirect);

// CATCH-ALL TO SERVE FRONT END FILES
const path = require("path");
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/../build/index.html"));
});



const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});












// ---------------------------------------------------------------------------Separating for Readability---------------------------------------------------------------------------------------------------------

function getOrCreatUser(accessToken, refreshToken, extraParams, profile, done) {
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
