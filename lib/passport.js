const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const { PrismaClient } = require("@prisma/client");

const { authUser } = require('../controllers/auth.controllers');

const prisma = new PrismaClient();

passport.serializeUser((user, done) => {
  console.log('serializing user');
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  console.log('deserializing user');
  const user = await prisma.user.findUnique({
    where: {
      id
    }
  });
  done(null, user);
});

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, authUser));


module.exports = passport;

