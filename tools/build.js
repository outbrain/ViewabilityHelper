'use strict';
// source: https://medium.com/@tarkus/how-to-build-and-publish-es6-modules-today-with-babel-and-rollup-4426d9c7ca71
const fs = require('fs');
const del = require('del');
const rollup = require('rollup');
const babel = require('rollup-plugin-babel');
const uglify = require('rollup-plugin-uglify');
const pkg = require('../package.json');

const bundles = [
  {
    format: 'umd', ext: '.min.js', plugins: [uglify()],
    babelPresets: ['es2015-rollup', 'stage-1'], babelPlugins: [],
    moduleName: 'viewability-helper', minify: true
  }
];

let promise = Promise.resolve();

// Clean up the output directory
promise = promise.then(() => del(['dist/*']));

// Compile source code into a distributable format with Babel and Rollup
for (const config of bundles) {
  promise = promise.then(() => rollup.rollup({
    entry: 'src/viewability-helper.js',
    external: Object.keys(pkg.dependencies),
    plugins: [
      babel({
        babelrc: false,
        exclude: 'node_modules/**',
        presets: config.babelPresets,
        plugins: config.babelPlugins,
      })
    ].concat(config.plugins),
  }).then(bundle => bundle.write({
    dest: `dist/${config.moduleName || 'viewability-helper'}${config.ext}`,
    format: config.format,
    sourceMap: !config.minify,
    moduleName: config.moduleName,
  })));
}

// Copy package.json and LICENSE.txt
promise = promise.then(() => {
  delete pkg.private;
  delete pkg.devDependencies;
  delete pkg.scripts;
  delete pkg.eslintConfig;
  delete pkg.babel;
  fs.writeFileSync('dist/package.json', JSON.stringify(pkg, null, '  '), 'utf-8');
  fs.writeFileSync('dist/LICENSE', fs.readFileSync('LICENSE', 'utf-8'), 'utf-8');
});

promise.catch(err => console.error(err.stack)); // eslint-disable-line no-console