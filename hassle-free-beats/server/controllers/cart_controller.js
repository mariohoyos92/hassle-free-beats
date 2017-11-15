module.exports = {
  add: (req, res, next) => {
    if (req.session.cart) {
      req.session.cart.tracks.push(req.body.title);
      req.session.cart.total += 10;
    } else {
      req.session.cart = {
        tracks: [req.body.title],
        total: 10.0
      };
    }
    res.status(200).send(req.session.cart);
  },
  get: (req, res, next) => {
    console.log(req.session);
    if (req.session.cart) {
      res.status(200).json(req.session.cart);
    }
  }
};
