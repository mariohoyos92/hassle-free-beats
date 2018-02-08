module.exports = {
  add: (req, res, next) => {
    if (req.session.cart) {
      if (req.session.cart.tracks.indexOf(req.body.title) === -1) {
        req.session.cart.tracks.push(req.body.title);
        req.session.cart.total += 10;
        res.status(200).send(req.session.cart);
      } else {
        res.status(500).json("Item Already In Cart");
      }
    } else {
      req.session.cart = {
        tracks: [req.body.title],
        total: 10.0
      };
      res.status(200).send(req.session.cart);
    }
  },
  get: (req, res, next) => {
    if (req.session.cart) {
      res.status(200).json(req.session.cart);
    }
    else {
      res.status(200).json({tracks: []})
    }
  },
  delete: (req, res, next) => {
    if (req.session.cart.tracks.indexOf(req.params.title) !== -1) {
      req.session.cart.tracks.splice(
        req.session.cart.tracks.indexOf(req.params.title),
        1
      );
      res.status(200).json(req.session.cart);
    } else {
      res.status(500).json("nothing to delete");
    }
  }
};
