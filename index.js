/* jshint node: true */
'use strict';

var async = require('async');
var fs = require('fs');
var path = require('path');
var reLineBreak = /\n\r?/;
var reInclude = /^\s*\<{3}(\w*?)\s+([^\s\[]+)\[?(\d*)\:?(\d*)\]?/;

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

module.exports = function(source, callback) {
  // first split the source on line breaks
  var lines = source.split(reLineBreak);

  // replace any lines with includes
  async.map(lines, processLine, function(err, results) {
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

function processLine(line, callback) {
  var match = line && reInclude.exec(line);
  var fileType;

  // if not a match, then return the line unaltered
  if (! match) {
    return callback(null, line);
  }

  // get the filetype
  fileType = match[1] || path.extname(match[2]).slice(1);

  // console.log(fileType);
  fs.readFile(match[2], 'utf8', function(err, content) {
    if (err) {
      return callback(err);
    }

    // if we have lines specified get the target content
    if (match[3] || match[4]) {
      content = getRange(content, match[3], match[4]);
    }

    return callback(null, '```' + fileType + '\n' + content + '\n```');
  });
}

// module.exports =  pull.Through(function(read, config, pkgInfo) {
//   return function(end, cb) {
//     function next(end, data) {
//       // run the test on the first line in the data only at this stage
//       // TODO: process all the lines in case things have generated includes
//       var match = data && reInclude.exec(data[0]);
//       var matchEscaped = data && (! match) && reEscapedInclude.exec(data[0]);
//       var fileType;

//       // if this is an escaped include, remove the escape for the final
//       // output, which probably only caters for our self documenting this
//       // plugin
//       if (matchEscaped) {
//         data[0] = matchEscaped[1];
//       }

//       // if this is not a match, pass the data on
//       if (! match) {
//         return cb(end, data);
//       }

//       // get the filetype
//       fileType = match[1] || path.extname(match[2]).slice(1);

//       // read the contents of the specified file
//       getit(match[2], function(err, contents) {
//         // if we encountered an error, include an error message in the
//         // output
//         if (err) {
//           fileType = '';
//           contents = 'ERROR: could not find: ' + match[1];
//         }

//         // replace a require('..') or require('../..') call with 
//         // require('pkginfo.name') just to be helpful
//         contents = contents.replace(
//           reModuleRequire,
//           'require($1' + pkgInfo.name + '$2)'
//         );

//         // send the data along
//         cb(
//           end,
//           ['```' + fileType]
//             .concat(contents.split('\n'))
//             .concat(data.slice(1))
//             .concat('```')
//         );
//       });
//     }

//     return read(end, next);
//   };
// });