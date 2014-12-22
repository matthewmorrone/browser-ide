# Editr

## About

Editr is HTML, CSS and JavaScript playground that you can host on your server.

* easy setup
* based on ACE Editor
* supports multiple instances on one page
* configuration via JS object or HTML attributes

## Demo

You can see it [here](http://idered.pl/editr/)

## Structure

```
.
|---. editr
|   |--- editr.js
|   |--- editr.css
|   `--- items
```

**editr**
Folder containing Editr script, style and projects folder

**editr.js**
Editr main script. It's quite clean and have some comments so have fun with changing it.

**editr.css**
Editr style, it contains only some basic style so you can easily customize it.

**items**
Folder containing all your projects.

## Dependencies

* jQuery `//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js`
* ACE Editor `//d1n0x3qji82z53.cloudfront.net/src-min-noconflict/ace.js`

## Installation

Copy `editr` folder to root of your website.

Add this in `<head>`:

```html
<link rel="stylesheet" href="/editr/editr.css">
```

and this before `</body>`:

```html
<script src="//d1n0x3qji82z53.cloudfront.net/src-min-noconflict/ace.js"></script>
<script src="/editr/editr.js"></script>
```

## How to embed Editr

To embed Editr on your site, create a div with this attributes:

```html
<div class="editr" data-item="flat-ui" data-files="switch.html; radio.html; !normalize.css; radio.css; switch.css"></div>
```

and start Editr with jQuery:

```js
$('.editr').editr();
```

This will load `/editr/items/flat-ui/` project. This path is based on data-path and data-item or values passed in JS object.

First html file(`switch.html` in this case) is used as main preview.

In this example, `normalize.css` will be added to preview but it won't be visible or editable.

## Options

### Passed in HTML attributes

* `data-item` Name of project folder inside projects folder(js `path` or html attr `data-path` value).
* `data-path`(optional) Path to folder with projects.
* `data-theme`(optional) ACE Editor theme
* `data-hide`(optional) This attribute allows you to hide elements from Editr toolbar. Values: `all, result, html, css, js`.
* `data-files` List of files names separated by `;` which you want to show inside editor. If file name(or path) is preceeded with `!` then this file will be loaded inside editor but it won't be visible and editable. You an also put here paths to files e.g. `js/script.js` or 	`//cdnjs.cloudflare.com/ajax/libs/jade/0.27.7/jade.min.js`.

### Passed in JavaScript

* `theme` ACE Editor theme
* `callback` A function that is called after files are loaded.
* `path` This is used as default path for projects so you don't have to add it as html attribute. HTML attribute `data-path` will overwrite this default.

## License

**MIT Licensing**

Copyright (c) 2013 Kasper Mikiewicz

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
