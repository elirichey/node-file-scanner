const { conversions } = require("../utils/file_conversions");

let filterArrayByArgs = async (arrayOfArgType, query, size_min, size_max) => {
  return new Promise((resolve) => {
    let files = [...arrayOfArgType];
    if (query) files = filterQuery(files, query);
    if (size_min && !size_max) files = filterMinSize(files, size_min);
    if (size_max && !size_min) files = filterMaxSize(files, size_max);
    if (size_max && size_min) {
      files = filterBetweenSize(files, size_min, size_max);
    }
    resolve(files);
  });
};

let filterQuery = (files, query) => {
  let response = [];
  files.map(async (item) => {
    let q_val = query.toLowerCase();
    let i_val = item.file.toLowerCase();
    if (i_val.match(q_val)) {
      response.push(item);
    }
  });
  return response;
};

let filterMinSize = (files, size_min) => {
  let response = [];
  files.map((item) => {
    let min_units = conversions.convertToBytes(size_min);
    let larger = min_units < item.file_bytes;
    if (larger) response.push(item);
  });
  return response;
};

let filterMaxSize = (files, size_max) => {
  let response = [];
  files.map((item) => {
    let max_units = conversions.convertToBytes(size_max);
    let smaller = max_units > item.file_bytes;
    if (smaller) response.push(item);
  });
  return response;
};

let filterBetweenSize = (files, size_min, size_max) => {
  let response = [];
  files.map((item) => {
    let max_units = conversions.convertToBytes(size_max);
    let min_units = conversions.convertToBytes(size_min);
    let smaller = max_units > item.file_bytes;
    let larger = min_units < item.file_bytes;
    if (larger && smaller) response.push(item);
  });
  return response;
};

module.exports.filterArrayByArgs = filterArrayByArgs;
