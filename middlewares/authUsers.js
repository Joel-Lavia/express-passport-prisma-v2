const passport = require("passport");
const jwt = require("jsonwebtoken");
const authUsers = (req, res, next) => {
  passport.authenticate("local", (error, user, info) => {
    if (error) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({ message: "L'utilisateur n'est pas authentifier" });
    }
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: Date.now + 3 * 60 * 1000 }
    );
    res.status(200).json(token);
  })(req, res, next); //faire appele a la fonction une nouvelle fois sinon "bug"
};
module.exports = authUsers;
