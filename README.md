
# injectcode

This is a simple helper that will parse a file and replace any inject
directives (`<<< snippet`) with the actual code referenced surrounded in
a [GFM](http://github.github.com/github-flavored-markdown/) code block.

The functionality was originally implemented in
[gendocs](https://github.com/DamonOehlman/gendocs) and has been ported
here to a standalone implementation.


[![NPM](https://nodei.co/npm/injectcode.png)](https://nodei.co/npm/injectcode/)

[![Build Status](https://api.travis-ci.org/DamonOehlman/injectcode.svg?branch=master)](https://travis-ci.org/DamonOehlman/injectcode) [![bitHound Score](https://www.bithound.io/github/DamonOehlman/injectcode/badges/score.svg)](https://www.bithound.io/github/DamonOehlman/injectcode) 

## Example Usage

From the command line:

```
injectcode < README.md
```

Would output the specified file with the inject directives replaced with
the code snippets resolved against the current working directory.

#### Valid Patterns

- `<<< filename.fileext`
  
  Inline the contents of the file as a ghfm code block using `fileext` as the
  language type.

- `<<<langtype filename.fileext`

  Inline contents as above, but override the ghfm code block language type
  with `langtype`.

- `<<< filename.fileext[n:m]`

  Inline the contents, from line `n` to line `m`.

- `<<< filename.fileext[n:]`

  Inline the file contents, from line `n` to the end of the file.

- `<<< filename.fileext[:m]`

  Inline the file contents, from the start of teh file to line `m`. 

### TODO

- Implement the remote include functionality that gendocs has.

## License(s)

### MIT

Copyright (c) 2016 Damon Oehlman <damon.oehlman@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
