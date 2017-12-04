const express = require("express");
const { json } = require("body-parser");
const cors = require("cors");
const session = require("express-session");
const massive = require("massive");
const passport = require("passport");
const Auth0Strategy = require("passport-auth0");
require("dotenv").config();

const port = process.env.PORT || 3001;

const stripe = require("stripe")(process.env.STRIPE_SECRET);
const mailgun = require("mailgun-js")({
  apiKey: process.env.MAILGUN_KEY,
  domain: process.env.MAILGUN_SECRET
});

// IMPORT CONTROLLERS
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
app.get("/api/beats", getPlaylistFromDb);

// SEND CONTACT-ME FORM EMAIL
app.post("/api/contact", emailController.contactForm);

// USER DASHBOARD
app.get("/api/pastpurchases", getPastPurchasesFromDb);

// SUCCESSFUL PAYMENT PAGE
app.get("/api/purchases", getNewPurchasedTracks);

// CART
app.get("/api/cart", cartController.get);
app.post("/api/cart", cartController.add);
app.delete("/api/cart/:title", cartController.delete);

// CHECKOUT
app.post("/api/charge", postSaleToDbAndRedirect);

// CATCH-ALL TO SERVE FRONT END FILES
const path = require("path");
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/../build/index.html"));
});

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});

// ---------------------------------------------------------------------------Functions That Call The Database---------------------------------------------------------------------------------------------------------

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

function getPlaylistFromDb(req, res, next) {
  app
    .get("db")
    .getPlaylist()
    .then(response => res.status(200).json(response))
    .catch(res.status(500));
}

function getPastPurchasesFromDb(req, res, next) {
  if (req.session.passport) {
    app
      .get("db")
      .getUserId([req.session.passport.user.user_id])
      .then(response => {
        console.log(response);
        app
          .get("db")
          .getPastPurchases([response[0].id])
          .then(beats => {
            console.log(beats);
            res.status(200).json(beats);
          })
          .catch(console.log);
      });
  } else {
    res.status(200).json("User not logged in");
  }
}

function getNewPurchasedTracks(req, res, next) {
  app
    .get("db")
    .getPurchasedTracks()
    .then(response => {
      let filter = response.filter(
        track => req.session.purchases.indexOf(track.title) !== -1
      );
      res.status(200).json(filter);
    })
    .catch(res.status(500));
}

function postSaleToDbAndRedirect(req, res) {
  stripe.charges.create(req.body, (stripeErr, stripeRes) => {
    if (stripeErr) {
      res.status(500).send({ error: stripeErr });
    } else {
      req.session.paid = true;
      req.session.purchases = req.session.cart.tracks;
      delete req.session.cart;
      res.redirect(200, "/success");

      if (req.session.passport) {
        app
          .get("db")
          .getUserId([req.session.passport.user.user_id])
          .then(response => {
            app
              .get("db")
              .createInvoiceForUser([
                new Date(),
                req.body.amount,
                response[0].id
              ])
              .then(invoiceResponse => {
                app
                  .get("db")
                  .getPlaylist()
                  .then(response => {
                    let filter = response.filter(
                      track => req.session.purchases.indexOf(track.title) !== -1
                    );
                    filter.forEach(trackObj => {
                      app
                        .get("db")
                        .createInvoiceLineForUser([
                          invoiceResponse[0].invoice_id,
                          trackObj.beat_id
                        ])
                        .then()
                        .catch(console.log("InvoiceLine"));
                    });
                  })
                  .catch(console.log("getplaylist"));
              })
              .catch(console.log("createInvoiceForUser"));
          });
      } else {
        app
          .get("db")
          .createInvoiceForUser([new Date(), req.body.amount, null])
          .then(invoiceResponse => {
            app
              .get("db")
              .getPlaylist()
              .then(response => {
                let filter = response.filter(
                  track => req.session.purchases.indexOf(track.title) !== -1
                );
                filter.forEach(trackObj => {
                  app
                    .get("db")
                    .createInvoiceLineForUser([
                      invoiceResponse[0].invoice_id,
                      trackObj.beat_id
                    ])
                    .then()
                    .catch(console.log("trackobj"));
                });
              })
              .catch(console.log("getplaylist2"));
          })
          .catch(console.log("CreateInvoiceforUser2"));
      }
    }
  });
}
