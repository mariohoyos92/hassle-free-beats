require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET);
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_ACCOUNT,
    pass: process.env.EMAIL_PASS
  }
})

module.exports = {
getPlaylistFromDb: (req, res, next) =>{
      req.app
        .get("db")
        .getPlaylist()
        .then(response => res.status(200).json(response))
        .catch(res.status(500));
},
getPastPurchasesFromDb:(req, res, next) =>{
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
getNewPurchasedTracks:(req, res, next) =>{
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
          
          let downloadLinks = purchases.map((track) => "<a href='"+track.url+ "' download>"+ track.title + "</a></br>");

          const mailOptions ={
            from: 'hasslefreebeats@gmail.com',
            to: stripeRes.source.name,
            subject: "Your Bangin Beats",
            html: "<h1>Thank You So Much For Your Service</h1></br><p>After your payment processed, our team of super-producers each bowed as they sent your beats off for delivery. They made sure to attach download links below so that you can start creating new art, and making a lot of money from it (at least we hope you do)! To continue, click the links below and then click on the download button.</p>" + downloadLinks.join("") + "</br><p>We at Hassle-Free-Beats wish you the best of luck in your ambitions. We hope to see you again soon.</p></br><h3>The Hassle Free Beats Team</h3>"
          }

          transporter.sendMail(mailOptions, (err,info) => {
            if(err){
              console.log(err)
            }
            else {
              console.log(info)
            }
          })

    })


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
}


}

