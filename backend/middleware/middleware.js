function idCheckMiddleware(req, res, next) {
  try {
    const id = req.headers["id"];
    if (id == 0) {
      next();
    } else {
      res.status(401).json({
        message: "Unauthorized... check your header",
      });
    }
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
}

module.exports = {
  idCheckMiddleware,
};
