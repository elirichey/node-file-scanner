const fs = require("fs");

let getFileSize = (filePath) => {
  fs.stat(filePath, (err, fileStats) => {
    if (!err) {
      return fileStats.size;
    } else {
      console.log(err);
    }
  });
};

let getFileSizeAsync = async (filePath) => {
  return new Promise((resolve) => {
    fs.stat(filePath, (err, fileStats) => {
      if (!err) {
        resolve(fileStats.size);
      } else {
        console.log(err);
      }
    });
  });
};

let info = {
  getFileSize,
  getFileSizeAsync,
};

module.exports.info = info;
