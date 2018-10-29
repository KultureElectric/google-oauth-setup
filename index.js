const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const keys = require("./config/keys");
const cookieSession = require("cookie-session");
require("./models/user");
require("./services/passport");

mongoose.connect("mongodb://localhost/google-oauth-setup");

const app = express();

app.use(
  cookieSession({
    name: "session",
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);

app.use(passport.initialize());

app.use(passport.session());

require("./routes/authRoutes")(app);

app.listen(5000);
