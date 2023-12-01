const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const prisma = new PrismaClient();

const register = async (req, res,next) => {
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
    console.log("existing user is", existingUser);
    console.log("user name is", name);
    console.log("user email is", email);

    if (!existingUser) {
      const user = await prisma.user.create({
        data: {
          name,
          email,
          password: hash,
        },
      });
      res.json(user);
    }
    // return res.redirect('/login')
    return res.json({ message: "User already exists" });
  } catch (error) {
    next(error)
    
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    let existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (existingUser) {
      const match = await bcrypt.compare(password, existingUser.password);
      if (match) {
        return res.json({ message: "Logged in successfully" });
      }
    }
    return res.json({ message: "Invalid credentials" });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  register,
  login
}