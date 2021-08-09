let convertFromBytes = (bytes) => {
  let sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  let numb = 1000; // 1024
  if (bytes == 0) return "n/a";
  let i = parseInt(Math.floor(Math.log(bytes) / Math.log(numb)));
  if (i == 0) return bytes + " " + sizes[i];
  let readable = bytes / Math.pow(numb, i) + " " + sizes[i];
  return readable;
};

let convertToBytes = (readable) => {
  let numb = 1000; // 1024
  let multipliers = {};
  multipliers.B = 1;
  multipliers.KB = multipliers.B * numb;
  multipliers.MB = multipliers.KB * numb;
  multipliers.GB = multipliers.MB * numb;
  multipliers.TB = multipliers.GB * numb;
  multipliers.PB = multipliers.TB * numb;
  multipliers.EB = multipliers.PB * numb;
  multipliers.ZB = multipliers.EB * numb;

  let value = parseValue(readable);
  let unit = parseUnit(readable);

  let totalBytes = value * multipliers[unit];
  return totalBytes;
};

let parseValue = (input) => {
  let value = parseFloat(input);
  if (isNaN(value)) throw "Input does not contain a numeric value.";
  return value;
};

let parseUnit = (input) => {
  let matches = input.toUpperCase().match(/([KMGTPEZ]I?)?B$/);
  if (!matches)
    throw "Input does not contain a supported unit of measurement (ex, KB).";
  let unit = matches[0].replace(/i/i, "");
  return unit;
};

let conversions = {
  convertFromBytes,
  convertToBytes,
};

module.exports.conversions = conversions;
