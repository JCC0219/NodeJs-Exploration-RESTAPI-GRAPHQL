const path = require("path");
const fs = require("fs");

const clearImage = (filePath) => {
  filePath = path.join(__dirname, "..", filePath);
  fs.unlink(filePath, (err) => console.log(`The error is : ${err}`));
};

// module.exports = { clearImage };
exports.clearImage = clearImage;
