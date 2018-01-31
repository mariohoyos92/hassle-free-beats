require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET);

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
