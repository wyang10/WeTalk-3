var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");
var { getDB } = require("./connection");
const { ObjectId } = require("mongodb");


var app = express();

app.use(logger("dev"));
app.use(express.json());

app.use(cookieParser());
app.use(express.static(path.join(__dirname, "build")));
app.use(cors({ origin: "*" }));

app.get("/*", async function (req, res, next) {
   res.sendFile(__dirname+'/build/index.html')
});


app.post("/post_twitter", async function (req, res, next) {
  const { username, content } = req.body;
  let user = await getDB().collection("users").findOne({ username: username });
  let nickname = "";
  if (user) {
    nickname = user.nickname;
    let date = new Date();
    await getDB().collection("twitters").insertOne({
      username,
      nickname,
      date,
      content,
      replycount: 0,
      likes: 0,
      dislikes: 0,
    });
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
});

app.post("/reply_twitter", async function (req, res, next) {
  const { username, content, twitter_id } = req.body;
  let user = await getDB().collection("users").findOne({ username: username });
  let nickname = "";
  if (user) {
    nickname = user.nickname;
    let date = new Date();
    await getDB()
      .collection("twitters_reply")
      .insertOne({ username, twitter_id, nickname, date, content });
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
});

app.post("/like_twitter", async function (req, res, next) {
  const { twitter_id } = req.body;
  let twitter = await getDB()
    .collection("twitters")
    .findOne({ _id: new ObjectId(twitter_id) });
  if (twitter) {
    await getDB()
      .collection("twitters")
      .updateOne(
        { _id: new ObjectId(twitter_id) },
        { $set: { likes: twitter.likes + 1 } }
      );
  }
  res.json({ success: true });
});

app.post("/dislike_twitter", async function (req, res, next) {
  const { twitter_id } = req.body;
  let twitter = await getDB()
    .collection("twitters")
    .findOne({ _id: new ObjectId(twitter_id) });
  if (twitter) {
    await getDB()
      .collection("twitters")
      .updateOne(
        { _id: new ObjectId(twitter_id) },
        { $set: { dislikes: twitter.dislikes + 1 } }
      );
  }
  res.json({ success: true });
});

app.post("/del_twitter", async function (req, res, next) {
  const { twitter_id } = req.body;
  await getDB()
    .collection("twitters")
    .deleteOne({ _id: new ObjectId(twitter_id) });
  await getDB()
    .collection("twitters_reply")
    .deleteOne({ twitter_id: twitter_id });
  res.json({ success: true });
});

app.post("/list_twitters", async function (req, res, next) {
  const { username } = req.body;
  let r = await getDB()
    .collection("twitters")
    .find({ username: username })
    .sort({ date: -1 })
    .toArray();
  for (let twitter of r) {
    twitter.replycount = await getDB()
      .collection("twitters_reply")
      .countDocuments({ twitter_id: twitter._id.toString() });
  }
  res.json(r);
});

app.post("/list_users", async function (req, res, next) {
  const { username } = req.body;
  let r = await getDB()
    .collection("users")
    .find({})
    .sort({ username: 1 })
    .toArray();
  res.json(r);
});

app.post("/list_followers", async function (req, res, next) {
  const { username } = req.body;
  let r = await getDB()
    .collection("follow")
    .find({ to: username })
    .sort({ to: 1 })
    .toArray();
  let result = [];
  for (let record of r) {
    let uname = record.from;
    let user = await getDB().collection("users").findOne({ username: uname });
    if (user) {
      result.push(user);
    }
  }
  res.json(result);
});

app.post("/list_followings", async function (req, res, next) {
  const { username } = req.body;
  let r = await getDB()
    .collection("follow")
    .find({ from: username })
    .sort({ to: 1 })
    .toArray();
  let result = [];
  for (let record of r) {
    let uname = record.to;
    let user = await getDB().collection("users").findOne({ username: uname });
    if (user) {
      result.push(user);
    }
  }
  res.json(result);
});

app.post("/is_followed", async function (req, res, next) {
  const { from, to } = req.body;
  let r = await getDB().collection("follow").findOne({ from: from, to: to });
  res.json({ result: r !== null });
});

app.post("/follow", async function (req, res, next) {
  const { from, to } = req.body;
  let r = await getDB().collection("follow").insertOne({ from: from, to: to });
  res.json({ success: true });
});

app.post("/unfollow", async function (req, res, next) {
  const { from, to } = req.body;
  let r = await getDB().collection("follow").deleteMany({ from: from, to: to });
  res.json({ success: true });
});

app.post("/get_twitter", async function (req, res, next) {
  const { twitter_id } = req.body;
  let r = await getDB()
    .collection("twitters")
    .findOne({ _id: new ObjectId(twitter_id) });
  res.json(r);
});

app.post("/get_twitter_replies", async function (req, res, next) {
  const { twitter_id } = req.body;
  let r = await getDB()
    .collection("twitters_reply")
    .find({ twitter_id: twitter_id })
    .toArray();
  res.json(r);
});

app.post("/register", async function (req, res, next) {
  const { username, password, nickname } = req.body;
  let r = await getDB()
    .collection("users")
    .find({ username: username })
    .toArray();
  if (r.length === 0) {
    let rr = await getDB()
      .collection("users")
      .insertOne({ username, password, nickname });
    res.json({ success: true });
  } else {
    res.json({ success: false, error: "duplicated username" });
  }
});

app.post("/login", async function (req, res, next) {
  const { username, password } = req.body;
  let r = await getDB()
    .collection("users")
    .find({ username: username, password: password })
    .toArray();
  if (r.length > 0) {
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
});


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

module.exports = app;
