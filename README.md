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

### TODO

- Implement the remote include functionality that gendocs has.
