module.exports = {
  playlist: (req, res, next) => {
    app
      .get("db")
      .getPlaylist()
      .then(response => res.status(200).json(response))
      .catch(res.status(500));
  }
};
