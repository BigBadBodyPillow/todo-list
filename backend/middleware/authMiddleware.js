const jwt = require('jsonwebtoken');

// check if authenticated
module.exports.requireAuth = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  // unautoerized
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    //forbidden
    if (err) return res.sendStatus(403);
    req.user = decoded;
    next();
  });
};
