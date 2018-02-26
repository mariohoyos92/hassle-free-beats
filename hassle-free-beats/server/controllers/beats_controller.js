require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET);
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_ACCOUNT,
    pass: process.env.EMAIL_PASS
  }
});

module.exports = {
  getPlaylistFromDb: (req, res, next) => {
    req.app
      .get("db")
      .getPlaylist()
      .then(response => {
        res.append("Cache-Control", "max-age=86400000");
        res.status(200).json(response);
      })
      .catch(res.status(500));
  },
  getPastPurchasesFromDb: (req, res, next) => {
    if (req.session.passport) {
      req.app
        .get("db")
        .getUserId([req.session.passport.user.user_id])
        .then(response => {
          req.app
            .get("db")
            .getPastPurchases([response[0].id])
            .then(beats => {
              res.status(200).json(beats);
            })
            .catch(console.log);
        });
    } else {
      res.status(200).json("User not logged in");
    }
  },
  getNewPurchasedTracks: (req, res, next) => {
    req.app
      .get("db")
      .getPurchasedTracks()
      .then(response => {
        let filter = response.filter(
          track => req.session.purchases.indexOf(track.title) !== -1
        );
        res.status(200).json(filter);
      })
      .catch(res.status(500));
  },
  postSaleToDbAndRedirect(req, res) {
    stripe.charges.create(req.body, (stripeErr, stripeRes) => {
      if (stripeErr) {
        res.status(500).send({ error: stripeErr });
      } else {
        req.session.paid = true;
        req.session.purchases = req.session.cart.tracks;

        delete req.session.cart;
        res.redirect(200, "/success");

        // Send Email Links
        req.app
          .get("db")
          .getPurchasedTracks()
          .then(toFilter => {
            let purchases = toFilter.filter(
              track => req.session.purchases.indexOf(track.title) !== -1
            );

            let downloadLinks = purchases.map(
              track =>
                "<a href='" +
                track.url +
                "' download>" +
                track.title +
                "</a></br>"
            );

            const mailOptions = {
              from: "hasslefreebeats@gmail.com",
              to: stripeRes.source.name,
              subject: "Your Bangin Beats",
              html:
                "<h1>Thank You So Much For Your Service</h1></br><p>After your payment processed, our team of super-producers each bowed as they sent your beats off for delivery. They made sure to attach download links below so that you can start creating new art, and making a lot of money from it (at least we hope you do)! To continue, click the links below and then click on the download button.</p>" +
                downloadLinks.join("") +
                "</br><p>We at Hassle-Free-Beats wish you the best of luck in your ambitions. We hope to see you again soon.</p></br><h3>The Hassle Free Beats Team</h3>"
            };

            transporter.sendMail(mailOptions, (err, info) => {
              if (err) {
                console.log(err);
              } else {
                console.log(info);
                req.app
                  .get("db")
                  .submitUserEmail([stripeRes.source.name])
                  .then()
                  .catch(console.log);
              }
            });
          });

        // Make Invoice Lines in DB for user that is logged in
        if (req.session.passport) {
          req.app
            .get("db")
            .getUserId([req.session.passport.user.user_id])
            .then(response => {
              req.app
                .get("db")
                .createInvoiceForUser([
                  new Date(),
                  req.body.amount,
                  response[0].id
                ])
                .then(invoiceResponse => {
                  req.app
                    .get("db")
                    .getPlaylist()
                    .then(response => {
                      let filter = response.filter(
                        track =>
                          req.session.purchases.indexOf(track.title) !== -1
                      );
                      filter.forEach(trackObj => {
                        req.app
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
          // Make invoice for checkout as guest
          req.app
            .get("db")
            .createInvoiceForUser([new Date(), req.body.amount, null])
            .then(invoiceResponse => {
              req.app
                .get("db")
                .getPlaylist()
                .then(response => {
                  let filter = response.filter(
                    track => req.session.purchases.indexOf(track.title) !== -1
                  );
                  filter.forEach(trackObj => {
                    req.app
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
  },
  sendFreeBeat: (req, res, next) => {
    const mailOptions = {
      from: "hasslefreebeats@gmail.com",
      to: req.body.email,
      subject: "Your Free Beat",
      html:
        "<h1>As promised, here is your free beat.</h1></br><a href='https://s3.us-east-2.amazonaws.com/hassle-free-beats-untagged-audio/Untagged+Mastered+Beats+Ready+For+Website/Ride+-+Hip+Hop.mp3' download>Ride</a></br><p>Go ahead. Take that beat. Use it. Create whatever song you want with it. Then, take your song, put in on Spotify, Youtube, SoundCloud, whatever it is you use. Make some money for your work! We won't bother you about it, we promise. That's the magic of our Hassle-Free-License. You pay us once and never worry about paying us again.</p></br><p>We at Hassle-Free-Beats wish you the best of luck in your ambitions and we hope to see you again soon.</p></br><h3>The Hassle Free Beats Team</h3>"
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        res.status(500);
        console.log(err);
      } else {
        res.status(200).json("email sent");
        req.app
          .get("db")
          .submitUserEmail([req.body.email])
          .then()
          .catch(console.log);
      }
    });
  }
};
