var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var helmet = require("helmet");
var mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();

// Import passport
require("./configs/passport");

var indexRouter = require("./routes/index");
var postRouter = require("./routes/post");
var commentRouter = require("./routes/comment");

mongoose.connect(process.env.DB_ENDPOINT, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://localhost:3000");
  res.header(
    "Access-Control-Allow-Methods",
    "POST, GET, PUT, PATCH, DELETE, OPTIONS"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Option, Authorization"
  );
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

app.use("/", indexRouter);
app.use("/post", postRouter);
app.use("/comment", commentRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(helmet());

module.exports = app;
