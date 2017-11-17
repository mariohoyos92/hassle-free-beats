module.exports = {
  getPurchases: (req, res, next) => {
    app
      .get("db")
      .getPlaylist()
      .then(response => {
        let filter = response.filter(
          track => req.session.purchases.indexOf(track.title) !== -1
        );
        res.status(200).json(filter);
      })
      .catch(res.status(500));
  }
};
