const express = require("express");
const feedController = require("../controller/feed");
const router = express.Router();
const { body } = require("express-validator");

// /feed/posts => GET
router.get("/posts", feedController.getPosts);

// /feed/post => POST
router.post(
  "/post",
  [
    body("title").trim().isLength({ min: 7 }), //edit here to simulate error , please insert length < 7 on title on front end
    body("content").trim().isLength({ min: 5 }),
  ],
  feedController.createPost
);

router.get("/post/:postId",feedController.getPost);
module.exports = router;
