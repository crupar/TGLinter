'use strict';

var range = require('mdast-util-heading-range');
var u = require('unist-builder');
var cuss = require('polibias');

module.exports = table;

function table() {
  return transformer;
}

function transformer(tree) {
  range(tree, 'list of rules', function (start, nodes, end) {
    var rows = [
      u('tableRow', [
        u('tableCell', [u('text', 'id')]),
        u('tableCell', [u('text', 'phrase')])
      ])
    ];

    Object.keys(cuss).forEach(function (phrase) {
      rows.push(u('tableRow', [
        u('tableCell', [u('inlineCode', id(phrase))]),
        u('tableCell', [u('inlineCode', phrase)])
      ]));
    });

    return [start].concat(u('table', rows), end);
  });
}

function id(value) {
  return value.replace(/\W+/g, '-');
}
