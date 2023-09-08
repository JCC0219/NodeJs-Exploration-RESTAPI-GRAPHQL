const express = require("express");
const feedController = require("../controller/feed");
const router = express.Router();

const isAuth = require("../middleware/is-auth");

const { body } = require("express-validator");

// /feed/posts => GET
router.get("/posts", isAuth, feedController.getPosts);

// /feed/post => POST
router.post(
  "/post",
  [
    body("title").trim().isLength({ min: 5 }),
    body("content").trim().isLength({ min: 5 }),
  ],
  feedController.createPost
);

router.get("/post/:postId", feedController.getPost);

//updating/editing a post use put
router.put(
  "/post/:postId",
  [
    body("title").trim().isLength({ min: 5 }),
    body("content").trim().isLength({ min: 5 }),
  ],
  feedController.updatePost
);

router.delete("/post/:postId", feedController.deletePost);

module.exports = router;
