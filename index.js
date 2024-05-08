// const usersRouter = require("./routes/users");
// const ordinateursRouter = require("./routes/ordinateurs");
const express = require("express");
const passport = require("passport");
const bcrypt = require("bcrypt");
const prisma = require("./db/prisma")
const authRouter = require("./routes/auth")

const LocalStrategie = require("passport-local").Strategy;
const dotenv = require("dotenv");

//sert a definire la strategie local pour identifier par mot de passe et username
const configPassport = new LocalStrategie({
usernameField:"email",
passwordField:"password"
}, async (email,password,done)  => {
 const  user = await prisma.u
 ser.findFirst({
  where:{email,password}
 });

 if (!user) {
  return done(null,false,{message:"user not exist"})
 } 


//hacher le password avec bcrypt
bcrypt.compare(password,user.password, (error, isMatch) => {
if (error) {
  return done(error);
}

if (!isMatch) {
  return done(null,false,{message:"password not correct"})
}
return done(null,user)
 })
});
//

//utiliser passport-local dans passport.js
passport.use(configPassport);
//

passport.serializeUser((user, done) => {
  done(null,user.id);
})


dotenv.config();
const PORT = process.env.PORT;
const server = express();
server.use(passport.initialize())
server.use(express.json());

server.get("/", (req, res) => {
  res.send("DEV WEB C3");
});

// server.use("/users", usersRouter);
// server.use("/ordinateurs", ordinateursRouter);
server.use("/",authRouter);

server.listen(PORT, () => console.log(`Le serveur est lancé sur ${PORT}`));
