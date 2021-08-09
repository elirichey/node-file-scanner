const fs = require("fs");
const path = require("path");
const { conversions } = require("../utils/file_conversions");
const { extenstions } = require("../utils/file_extensions");
const { info } = require("../utils/file_info");

// *********** - Scan Directory & Return Files of Type - *********** //

const filesBucket = [];

let scanDirForFileType = async (route, f_type, extension) => {
  return new Promise((resolve) => {
    let selectedFileType = extenstions[f_type];

    let isDir = fs.statSync(route).isDirectory();
    if (isDir) {
      fs.readdir(route, async (err, files) => {
        if (err) return console.log("Unable to scan directory: " + err);

        let promises = files.map(async (file) => {
          let filePath = route + "/" + file;
          let isDir = fs.statSync(filePath).isDirectory();

          if (isDir) {
            return scanDirForFileType(filePath, f_type, extension);
          } else {
            // Filter out dot files...
            // if () "/(^|[\/\\])\../"
            //
            let file_bytes = await info.getFileSizeAsync(filePath);
            let file_size = conversions.convertFromBytes(file_bytes);

            let fileObj = {
              file: file,
              file_ext: path.extname(file),
              file_path: filePath,
              file_bytes: file_bytes,
              file_size: file_size,
            };
            checkFileTypePromise(f_type, extension, selectedFileType, fileObj);
          }
        });
        Promise.all(promises).then(() => {
          resolve(filesBucket);
        });
      });
    } else {
      console.log("Please pass a directory");
      resolve(false);
    }
  });
};

// Execute Promise for checking file type
// - If true, push to filesBuckets
let checkFileTypePromise = async (
  f_type,
  extension,
  selectedFileType,
  fileObj
) => {
  let objIsOfFileType = await checkFileTypeResponse(
    f_type,
    extension,
    selectedFileType,
    fileObj
  );

  if (objIsOfFileType) {
    filesBucket.push(fileObj);
  }
};

// Checks if file type matches f_type arguments
let checkFileTypeResponse = (f_type, extension, selectedFileType, fileObj) => {
  return new Promise((resolve, reject) => {
    let hasArgs = f_type || extension;
    // Get All
    if (!hasArgs) {
      if (!filesBucket.includes(fileObj.file_path)) {
        resolve(true);
      }
    }

    // Take Arguments
    // File Type
    let fileType = f_type && !extension;
    if (fileType) {
      if (selectedFileType.some((ext) => fileObj.file_ext === ext)) {
        if (!filesBucket.includes(fileObj.file_path)) {
          resolve(true);
        }
      }
    }

    // File Extension
    if (extension && !f_type) {
      let file_ext;
      extension.includes(".")
        ? (file_ext = extension)
        : (file_ext = `.${extension}`);
      if (fileObj.file_ext === file_ext) {
        if (!filesBucket.includes(fileObj.file_path)) {
          resolve(true);
        }
      }
    }

    resolve(false);
  });
};

module.exports.scanDirForFileType = scanDirForFileType;
