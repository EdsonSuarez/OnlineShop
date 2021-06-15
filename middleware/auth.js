const jwt = require("jsonwebtoken");


// Comprobar token del usuario
const auth = (req, res, next) => {
  let jwtToken = req.header("Authorization");
  if (!jwtToken) return res.status(400).send("No token, authorization denied");
  jwtToken = jwtToken.split(" ")[1];

  if (!jwtToken) return res.status(401).send("No token, authorization denied");
  try {
    const payload = jwt.verify(jwtToken, process.env.SECRET_kEY_JWT);
    req.user = payload;
    next();
  } catch (error) {
    return res.status(401).send("Invalid token, authorization denied");
  }
};

module.exports = auth;
