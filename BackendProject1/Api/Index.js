const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./Models/userdataschema");
const Posts = require("./Models/Posts");
const bcrypter = require("bcrypt");
const app = express();
const jwt = require("jsonwebtoken");
const multer = require("multer");
const upload = multer(); // Configure multer for multipart form data
const cookieParser = require("cookie-parser");

const salt = bcrypter.genSaltSync(10);
const secret = "ad347hajsgh123asf123ads324fa2dsa";

app.use(cookieParser());
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// connect to mongo database
mongoose.connect("mongodb://localhost:27017");

// app.get("/", (req, res) => {
//   res.send("hello");
// });

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    const userDoc = await User.create({
      username,
      password: bcrypter.hashSync(password, salt),
    });
    res.json(userDoc);
  } catch (error) {
    res.status(400).json(error);
  }
});
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const userDoc = await User.findOne({ username });
  const passok = bcrypter.compareSync(password, userDoc.password);

  if (passok) {
    jwt.sign({ username, id: userDoc._id }, secret, {}, (err, token) => {
      if (err) throw err;
      res.cookie("token", token).json({
        id: userDoc._id,
        username,
      });
    });
  } else {
    res.status(400).json("wrong credentials");
  }
});

app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }
  jwt.verify(token, secret, {}, (err, info) => {
    if (err) throw err;
    res.json(info);
  });
});

app.post("/logout", (req, res) => {
  res.cookie("token", "").json("logged out");
});

app.post("/post", upload.none(), async (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, secret, {}, async (err, info) => {
    if (err) throw err;
    const { title, summary, content } = req.body;
    const postDoc = await Posts.create({
      title,
      summary,
      content,
      author: info.id,
    });
    res.json(postDoc);
  });
});

app.put('/post',upload.none(), (req, res) =>{
  const { token } = req.cookies;
  jwt.verify(token, secret, {}, async (err, info) => {
    if (err) throw err;
    const {id, title, summary, content } = req.body;
    // const postauth = await Posts.findById(id);
    // const isAuthor = JSON.stringify(postauth.author) === JSON.stringify(info.id);

    // if(!isAuthor){
    //   res.status(400).json('you are not author');
    // }
    const postDoc = await Posts.updateOne(
      {
        title,
        summary,
        content,
      }
    );
    res.json(postDoc);
  });

})


app.get("/post", async (req, res) => {
  res.json(
    await Posts.find().populate("author", "username").sort({ createdAt: -1 })
  );
});

app.get("/post/:id", async (req, res) => {
  const { id } = req.params;
  const postDoc = await Posts.findById(id).populate("author", "username");
  res.json(postDoc);
});



app.delete("/post/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // Find and delete the post by ID
    const deletedPost = await Posts.findByIdAndDelete(id);

    if (!deletedPost) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.status(200).json({ message: "Post deleted successfully" });
  } catch (err) {
    console.error("Error deleting post:", err);
    res.status(500).json({ error: "Failed to delete post" });
  }
});

app.listen(4000);
