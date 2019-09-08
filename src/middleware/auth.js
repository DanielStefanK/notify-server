const jwt = require("jsonwebtoken");

const auth = function(req, res, next) {
  const token = req.headers["authorization"].replace("Bearer ", "");

  if (token) {
    jwt.verify(token, process.env.JWT_KEY, function(err, decoded) {
      if (err) {
        return res.status(401).json({
          success: false,
          data: null,
          error: "could not authenticate"
        });
      }
      req.decoded = decoded;
      next();
    });
  } else {
    return res.status(401).json({
      success: false,
      data: null,
      error: "could not authenticate"
    });
  }
};

module.exports = auth;
