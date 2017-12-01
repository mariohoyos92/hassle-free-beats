module.exports = {
  checkLogStatus: (req, res, next) => {
    res.status(200).json(req.session);
  },
  logout: (req, res, next) => {
    req.session.destroy();
    res.redirect(200, "/");
  }
};
