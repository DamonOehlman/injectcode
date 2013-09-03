# injectcode

This is a simple helper that will parse a file and replace any inject
directives (`<<< snippet`) with the actual code referenced surrounded in
a [GFM](http://github.github.com/github-flavored-markdown/) code block.

The functionality was originally implemented in
[gendocs](https://github.com/DamonOehlman/gendocs) and has been ported
here to a standalone implementation.


[![NPM](https://nodei.co/npm/injectcode.png)](https://nodei.co/npm/injectcode/)


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

```md
This is a sample

<<< test/test.js[:2]

<<< test/test.js[4:6]

<<< test/test.js[10:]
```

### TODO

- Implement the remote include functionality that gendocs has.

## License(s)

### MIT

Copyright (c) 2013 Damon Oehlman <damon.oehlman@gmail.com>

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
