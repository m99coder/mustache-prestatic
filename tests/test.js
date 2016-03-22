'use strict';

const fs = require('fs');
const path = require('path');

const promisify = require('lagden-promisify');
const tape = require('tape');

const plugin = require('../src/index.js');
const readFile = promisify(fs.readFile);

const templateFiles = [
  'tests/input/views/blog.mustache',
  'tests/input/views/home.mustache'
];
const dataFiles = [
  'tests/input/data/home.json'
];
const partialFiles = [
  'tests/input/partials/article.mustache',
  'tests/input/partials/header.mustache'
];

/**
* testCompile() runs tests based on the passed parameters
* and the amount of paths in the templateFiles by comparing
* the output to fixtures
*
* @param {Object} t
* @param {Array} dataFiles
* @param {Array} partialFiles
* @param {String} fixtureKey
* @param {String} message
*/
const testCompile = function (t, dataFiles, partialFiles, fixtureKey, message) {
  plugin(templateFiles, dataFiles, partialFiles)
    .then(function (results) {
      var fileExtension = fixtureKey + '.html';

      results.forEach(function (html, index) {
        let fileName = path.parse(templateFiles[index]).name;
        let filePath = path.join('tests/fixtures/', fileName) + fileExtension;

        readFile(filePath, 'utf8')
          .then (function (data) {
            t.deepEqual(
              results[index],
              data,
              message
            );
          });
      });
    });
};

tape('Should compile HTML from given files.', function (t) {
  // Execute three tests, each test tests all templateFiles
  t.plan(templateFiles.length * 3);

  testCompile(t, dataFiles, partialFiles, '', 'Use templates, data and partials.');
  testCompile(t, dataFiles, [], '-data', 'Use templates and data.');
  testCompile(t, [], partialFiles, '-partial', 'Use templates and partials.');
});