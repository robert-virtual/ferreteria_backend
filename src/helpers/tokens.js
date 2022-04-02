const { sign } = require("jsonwebtoken");

exports.genAccessToken = ({ id, correo, rid, admin = false }) => {
  // rid = refresh token id
  return sign({ id, correo, rid, admin }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "20m",
  });
};

exports.genRefreshToken = ({ id, correo }) => {
  return sign({ id, correo }, process.env.REFRESH_TOKEN_SECRET);
};
