const express = require("express");
const { json } = require("body-parser");
const cors = require("cors");
const session = require("express-session");
const massive = require("massive");
const passport = require("passport");
const Auth0Strategy = require("passport-auth0");
const { secretKey } = require("../config").stripe;
require("dotenv").config();

const stripe = require("stripe")(secretKey);
const mailgun = require("mailgun-js")({
  apiKey: process.env.MAILGUN_KEY,
  domain: process.env.MAILGUN_SECRET
});

// IMPORT CONTROLLERS
const cartController = require("./controllers/cart_controller");

// CONFIG VARIABLES BELOW
// const { secret } = require("../config").session;
// const { domain, clientID, clientSecret } = require("../config").auth0;
// const { secretKey } = require("../config").stripe;
// const { mailgunKey, mailgunDomain } = require("../config").mailgun;

const port = process.env.PORT || 3001;

// BEGIN SERVER
const app = express();

// SERVE FRONTEND
// app.use(express.static(`${__dirname}/../build`));

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

app.get("/api/logstatus", (req, res, next) => {
  res.status(200).json(req.session);
});

app.get("/api/logout", (req, res, next) => {
  req.session.destroy();
  res.redirect(200, "/");
});

// GET BEATS FOR MUSIC STORE
app.get("/api/beats", (req, res, next) => {
  app
    .get("db")
    .getPlaylist()
    .then(response => res.status(200).json(response))
    .catch(res.status(500));
});

// SEND CONTACT-ME FORM EMAIL
app.post("/api/contact", function(req, res) {
  let data = {
    from: `${req.body.name} <${req.body.email}>`,
    to: "support@hasslefreebeats.com, support@hasslefreebeats.com",
    subject: `${req.body.subject}`,
    text: `${req.body.emailBody}`
  };

  mailgun.messages().send(data, function(error, body) {
    console.log(body);
    if (body.message === "Queued. Thank you.") {
      res.status(200).json("message sent");
    } else {
      res.status(500).json(error);
      console.log(error);
    }
  });
});

// USER DASHBOARD
app.get("/api/pastpurchases", (req, res, next) => {
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
});

// SUCCESSFUL PAYMENT PAGE
app.get("/api/purchases", (req, res, next) => {
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
});

// CATCH-ALL TO SERVE FRONT END FILES
// const path = require("path");
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "/../build/index.html"));
// });

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
