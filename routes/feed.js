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
    body("title").trim().isLength({ min: 5 }),
    body("content").trim().isLength({ min: 5 }),
  ],
  feedController.createPost
);

module.exports = router;
