const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));
mongoose.connect("mongodb+srv://admin-shubham:Shub1997%40@cluster0.b7uqm.mongodb.net/blogDB");

const homeStartingContent = "Use '+' in right corner for creating new post.";
const aboutContent = "Create your own post using + in the right corner with 'Title' and 'Content' and Save here forever and Access whenever you want.";
const contactContent = "Contact Me :";

const postSchema = {
  title: String,
  content: String
};

const Post = mongoose.model("Post", postSchema);

app.get("/", function(req, res) {
  Post.find({}, function(err, foundPost) {
    res.render("home", {
      content: homeStartingContent,
      posts: foundPost
    });
  });

});

app.get("/about", function(req, res) {
  res.render("about", {
    content: aboutContent
  });
});

app.get("/contact", function(req, res) {
  res.render("contact", {
    content: contactContent
  });
});

app.get("/compose", function(req, res) {
  res.render("compose");
});

app.post("/compose", function(req, res) {
  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postContent
  });
  post.save(function(err){
    if(!err){
      res.redirect("/");
    }
  });

});

app.get("/posts/:postId", function(req, res) {
  const requestPostId = req.params.postId;
  Post.findOne({
    title: requestPostId
  }, function(err, foundPost) {
    // // javascript lodash library to remove all the capitalisation and dashes between the text
    // // like Day1 or Day-1
    // if (_.lowerCase(post.title) === _.lowerCase(routeParameter)) {
      res.render("post", {
        title: foundPost.title,
        content: foundPost.content
      });
  });
});



let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}


app.listen(port, function() {
  console.log("Server started on port 3000");
});
