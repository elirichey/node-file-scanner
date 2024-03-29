/*/ Command takes the following arguments
 *  - Path
 *  - Type of file or file extention
 *  - Query of file name
 *  - File Size Minimum by ["Bytes", "KB", "MB", "GB", "TB"];
 *  - File Size Maximum by ["Bytes", "KB", "MB", "GB", "TB"];
/*/
const fs = require("fs");
const path = require("path");
const { program } = require("commander");
const { scanDirForFileType } = require("./app/browse/scan_files");
const { filterArrayByArgs } = require("./app/browse/arg_filter");
const { write } = require("./app/utils/write_json");

// **************************** - Commander JS - CLI - **************************** //

let powerCLI = async () => {
  program
    .option("-p, --path <type>", "Please provide path for scanning")
    .option(
      "-t, --type <type>",
      "Selected file type: audio, book, code, compressed, data, executable, font, guitar, image, text, slide, video, web"
    )
    .option("-e, --extension <type>", "Search for a specific file extension")
    .option("-q, --query <type>", "Search file title for keyword")
    .option("-min, --minimum-size <type>", "Search for files larger than min")
    .option("-max, --maximum-size <type>", "Search for files smaller than max");
  program.parse(process.argv);

  let options = program.opts();

  if (options.debug) console.log("Debug: Doesn't do anything right now... ");

  let route = options.path ? options.path : null;
  let f_type = options.type ? options.type : null;
  let extension = options.extension ? options.extension : null;

  let query = options.query ? options.query : null;
  let size_min = options.minimumSize ? options.minimumSize : null;
  let size_max = options.maximumSize ? options.maximumSize : null;

  let pickFileArg =
    "Cannot have both extension and file type as arguments. Please pick one or the other";
  if (f_type && extension) return console.log(pickFileArg);

  let arrayOfArgType = await scanDirForFileType(route, f_type, extension);
  if (arrayOfArgType) {
    let arrayOfFiltered = await filterArrayByArgs(
      arrayOfArgType,
      query,
      size_min,
      size_max
    );

    /*/ Move Files / Rename Files
    arrayOfFiltered.forEach((item) => {
      let oldPath = item.file_path;
      // let newPath = `/Users/zilla/Desktop/Unknown/${item.file}`;
      let newExt = `/Users/zilla/Desktop/Unknown/${item.file}.psd`;
      
      let removeExt = `/Users/zilla/Desktop/Unknown/${item.file.replace(
        /\.[^/.]+$/,
        ""
      )}`;

      fs.rename(oldPath, removeExt, (err) => {
        if (err) throw err;
        console.log("Renamed!", removeExt);
      });
    });
    */

    /*/ Rename Files
    arrayOfFiltered.forEach((item) => {
      let oldPath = item.file_path;
      let newPath = `${item.file_path}.mp4`;
      fs.rename(oldPath, newPath, (err) => {
        if (err) throw err;
        console.log("Renamed - AKA moved!");
      });
    });
    */

    /*
    let args = {
      dir_path: options.path ? options.path : null,
      file_types: options.type ? options.type : null,
      extension: options.extension ? options.extension : null,
      search_query: options.query ? options.query : null,
      size_min: options.minimumSize ? options.minimumSize : null,
      size_max: options.maximumSize ? options.maximumSize : null,
    };

    let response = await write.writeJson(arrayOfFiltered, args);
    if (response) {
      return console.log("File Created");
    }
    */
  }
};
powerCLI();
