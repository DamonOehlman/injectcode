/* jshint node: true */
'use strict';

var async = require('async');
var fs = require('fs');
var path = require('path');
var matcher = require('./matcher');
var reLineBreak = /\n\r?/;

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
  start = (start ? start : 1) - 1;
  end = (end ? end : lines.length) - 1;

  // return the extract
  return lines.slice(start, end + 1).join('\n');
}

function processLine(opts) {
  return function(line, callback) {
    var match = line && matcher.exec(line, opts);
    var matchData = matcher.process(match, opts);

    // if not a match, then return the line unaltered
    if (! matchData) {
      return callback(null, line);
    }

    fs.exists(matchData.fileName, function(exists) {
      if (! exists) {
        return callback(null, line);
      }

      fs.readFile(matchData.fileName, 'utf8', function(err, content) {
        var outputLines;

        if (err) {
          return callback(err);
        }

        // if we have lines specified get the target content
        if (matchData.rangeStart|| matchData.rangeEnd) {
          content = getRange(content, matchData.rangeStart, matchData.rangeEnd);
        }

        outputLines = [
          match[1] + '```' + fileType
        ].concat(content.split(reLineBreak)).concat(['```']);

        return callback(null, outputLines.join('\n' + match[1]));
      });
    });
  };
}
