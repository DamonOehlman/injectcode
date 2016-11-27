var path = require('path');
var reInclude = [
  /^(\s*)\<{3}(\w*?)\s+([^\s\[]+)\[?(\d*)\:?(\d*)\]?/,
  /^(\s*)(\w+)?\:?\[.*?]\((\S+)\s?\"?(\d*)\:?(\d*)\"?\)/
];

exports.exec = function(line, opts) {
  return reInclude.map(function(regex) {
    return regex.exec(line);
  }).filter(Boolean)[0];
}

exports.process = function(match, opts) {
  var cwd = (opts || {}).cwd || process.cwd();

  if (!match) {
    return;
  }

  return {
    fileName: path.resolve(cwd, match[3]),
    fileType: match[2] || path.extname(match[3]).slice(1),
    rangeStart: parseInt(match[4], 10) || undefined,
    rangeEnd: parseInt(match[5], 10) || undefined 
  }
};