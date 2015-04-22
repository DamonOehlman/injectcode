/* jshint node: true */
'use strict';

var async = require('async');
var fs = require('fs');
var path = require('path');
var reLineBreak = /\n\r?/;
var reInclude = [
  /^(\s*)\<{3}(\w*?)\s+([^\s\[]+)\[?(\d*)\:?(\d*)\]?/,
  /^(\s*)(\w+)?\:?\[.*?]\((\S+)\s?\"?(\d*)\:?(\d*)\"?\)/
];

/**
  # injectcode

  This is a simple helper that will parse a file and replace any inject
  directives (`<<< snippet`) with the actual code referenced surrounded in
  a [GFM](http://github.github.com/github-flavored-markdown/) code block.

  The functionality was originally implemented in
  [gendocs](https://github.com/DamonOehlman/gendocs) and has been ported
  here to a standalone implementation.

  ## Example Usage

  From the command line:

  ```
  injectcode < README.md
  ```

  Would output the specified file with the inject directives replaced with
  the code snippets resolved against the current working directory.

  The following is a simple example that is used to test injectcode, and
  demonstates also how ranged expressions can be used to select only
  some of the content of the source file.

  <<< test/sample.md

  ### TODO

  - Implement the remote include functionality that gendocs has.

**/

module.exports = function(source, opts, callback) {
  // first split the source on line breaks
  var lines = source.split(reLineBreak);

  // replace any lines with includes
  async.map(lines, processLine(opts), function(err, results) {
    callback(err, err ? lines : results.join('\n'));
  });
};

function getRange(content, start, end) {
  var lines = content.split(reLineBreak);

  // determine the start and end indexes
  start = (start ? parseInt(start, 10) : 1) - 1;
  end = (end ? parseInt(end, 10) : lines.length) - 1;

  // return the extract
  return lines.slice(start, end + 1).join('\n');
}

function processLine(opts) {
  var cwd = (opts || {}).cwd || process.cwd();

  return function(line, callback) {
    var match = line && reInclude.map(function(regex) {
      return regex.exec(line);
    }).filter(Boolean)[0];
    var fileType;
    var fileName;

    // if not a match, then return the line unaltered
    if (! match) {
      return callback(null, line);
    }

    // get the filetype
    fileType = match[2] || path.extname(match[3]).slice(1);
    fileName = path.resolve(cwd, match[3]);

    fs.exists(fileName, function(exists) {
      if (! exists) {
        return callback(null, line);
      }

      fs.readFile(fileName, 'utf8', function(err, content) {
        var outputLines;

        if (err) {
          return callback(err);
        }

        // if we have lines specified get the target content
        if (match[4] || match[5]) {
          content = getRange(content, match[4], match[5]);
        }

        outputLines = [
          match[1] + '```' + fileType
        ].concat(content.split(reLineBreak)).concat(['```']);

        return callback(null, outputLines.join('\n' + match[1]));
      });
    });
  };
}
