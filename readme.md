# {{ mustache }} prestatic
[![Travis Build Status][travis-icon]][travis]
[![David Dependencies Status][david-icon]][david]
[![David devDependencies Status][david-dev-icon]][david-dev]

Node.js module that turns [mustache] files, partials and data into static HTML pages. Making [mustache.js] usable through a simple CLI and JavaScript API by allowing multiple files as input. mustache-prestatic automatically maps the passed partial files to their file names and populates the template files from passed data files with the same name.

`npm install mustache-prestatic --save-dev`

## Examples

### CLI
This will take all files in the 'views', 'data' and 'partials' directories and use those together to write HTML files to the 'dist' directory.:
```shell
mustache-prestatic ./views/* --data ./data/* --partials ./partials/* --output dist
```

### JavaScript
```js
const mustachePrestatic = require('mustache-prestatic');

const templateFiles = ['views/blog.mustache', 'views/home.mustache'];
const dataFiles = ['data/home.json'];
const partialFiles = ['partials/article.mustache', 'partials/header.mustache'];

mustachePrestatic(templateFiles, dataFiles, partialFiles)
  .then(console.log);
```

## API

### CLI
```
Usage: mustache-prestatic templateFiles [options]
Compile pages of static HTML from mustache templates, data and partials.

Options:
  --help, -h      Show help text.
  --version, -v   Show version number.
  --data, -d      Input mustache template data files.
  --partials, -p  Input mustache partial files.
  --output, -o    Output directory, defaults to current directory.
  --verbose       Log extra information about the process to stdout.
```

### JavaScript
#### mustachePrestatic(templateFiles, [dataFiles], [partialFiles])
Compile HTML from provided mustache files.

##### templateFiles
Type: `Array`  
The files that contain the mustache templates, or often called views.

##### dataFiles
Type: `Array`  
The files that contain the mustache template data, this data will populate the template files.

##### partialFiles
Type: `Array`  
The files that contain the mustache partials, these are re-usable parts of views that get included.

[mustache]: https://mustache.github.io/
[mustache.js]: https://github.com/janl/mustache.js
[travis]: https://travis-ci.org/Siilwyn/mustache-prestatic
[travis-icon]: https://img.shields.io/travis/Siilwyn/mustache-prestatic.svg?style=flat-square
[david]: https://david-dm.org/Siilwyn/mustache-prestatic
[david-icon]: https://img.shields.io/david/Siilwyn/mustache-prestatic.svg?style=flat-square
[david-dev]: https://david-dm.org/Siilwyn/mustache-prestatic#info=devDependencies
[david-dev-icon]: https://img.shields.io/david/dev/Siilwyn/mustache-prestatic.svg?style=flat-square