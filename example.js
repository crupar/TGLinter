var vfile = require('to-vfile');
var report = require('vfile-reporter');
var unified = require('unified');
var english = require('retext-english');
var stringify = require('retext-stringify');
var polibiased = require('polibiased');

unified()
  .use(english)
  .use(polibiased)
  .use(stringify)
  .process(vfile.readSync('example.txt'), function (err, file) {
    console.error(report(err || file));
  });