exports.getPosts = (req, res, next) => {
  res.status(200).json({
    post: [{ title: "first post", content: "this is the first post" }],
  });
};

exports.createPost = (req, res, next) => {
  const title = req.body.title;
  const content = req.body.content;
  console.log(title)
  //Create post in db
  res.status(200).json({
    message: "Post created successfully",
    post: [{ id : new Date().toISOString(),title: title, content: content }],
  });
};
