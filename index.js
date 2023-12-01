require("dotenv").config();

const express = require("express");

const app = express();

const morgan = require("morgan");

const session = require("express-session");

const flash = require("express-flash");

const { PORT = 8000 } = process.env;

const bodyparser = require("body-parser");

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

app.use(morgan("dev"));

app.use(express.urlencoded({ extended: false }));

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
  })
);

const passport = require("./lib/passport");

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

const authRouter = require("./routes/auth.routes");
app.use(authRouter);

app.listen(PORT, () => {
  console.log("Listening on port", PORT);
});
