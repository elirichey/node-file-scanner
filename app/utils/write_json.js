const fs = require("fs");

let writeJson = async (arrayOfFiltered, args) => {
  return new Promise((resolve) => {
    let pushJson = {
      arguments: args,
      results: arrayOfFiltered,
    };
    let resString = JSON.stringify(pushJson);
    let timeStamp = new Date().getTime();
    fs.writeFile(`./export/${timeStamp}.json`, resString, (error) => {
      if (error) throw error;
    });
    resolve(true);
  });
};

let write = {
  writeJson,
};

module.exports.write = write;
