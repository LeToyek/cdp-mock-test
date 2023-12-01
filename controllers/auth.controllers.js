const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");

const register = async (req, res, next) => {
  const { name, email, password } = req.body;
  // const salt = await bcrypt.genSalt(10);
  if (password.length < 6) {
    return res.json({ message: "Password must be atleast 6 characters" });
  }
  const hash = await bcrypt.hash(password, 10);
  console.log("hash is", hash);
  try {
    let existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!existingUser) {
      const user = await prisma.user.create({
        data: {
          name,
          email,
          password: hash,
        },
      });
      res.json(
        {"status": true,
        "message": "User created successfully",
        "error": null,
        "data": user}
      );
    }
    // return res.redirect('/login')
    return res
      .status(400)
      .json({
        "status": false,
        "message": "Bad Request",
        "error": "User already exists",
        "data": null
      });
  } catch (error) {
    next(error);
  }
};

const authUser = async (email, password, done) => {
  try {
    let existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (existingUser) {
      const match = await bcrypt.compare(password, existingUser.password);
      if (match) {
        return done(null, existingUser);
      }
    }
    return done(null, false, { message: "Invalid credentials" });
  } catch (error) {
    console.log(error);
  }
};

const logOut = (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.json({ message: "Logged out successfully" });
  });
};

module.exports = {
  register,
  authUser,
  logOut,
};
