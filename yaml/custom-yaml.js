
'use strict';

/*eslint-disable no-console*/

var fs   = require('fs');
var path = require('path');
var util = require('util');
var yaml = require('js-yaml');


// Let's define a couple of classes.

function Point(x, y, z) {
  this.klass = 'Point';
  this.x     = x;
  this.y     = y;
  this.z     = z;
}


function Space(height, width, points) {
  if (points) {
    if (!points.every(function (point) { return point instanceof Point; })) {
      throw new Error('A non-Point inside a points array!');
    }
  }

  this.klass  = 'Space';
  this.height = height;
  this.width  = width;
  this.points = points;
}


// Then define YAML types to load and dump our Point/Space objects.

var PointYamlType = new yaml.Type('!point', {
  // Loader must parse sequence nodes only for this type (i.e. arrays in JS terminology).
  // Other available kinds are 'scalar' (string) and 'mapping' (object).
  // http://www.yaml.org/spec/1.2/spec.html#kind//
  kind: 'sequence',

  // Loader must check if the input object is suitable for this type.
  resolve: function (data) {
    // `data` may be either:
    // - Null in case of an "empty node" (http://www.yaml.org/spec/1.2/spec.html#id2786563)
    // - Array since we specified `kind` to 'sequence'
    return data !== null && data.length === 3;
  },

  // If a node is resolved, use it to create a Point instance.
  construct: function (data) {
    return new Point(data[0], data[1], data[2]);
  },

  // Dumper must process instances of Point by rules of this YAML type.
  instanceOf: Point,

  // Dumper must represent Point objects as three-element sequence in YAML.
  represent: function (point) {
    return [ point.x, point.y, point.z ];
  }
});


var SpaceYamlType = new yaml.Type('!space', {
  kind: 'mapping',
  construct: function (data) {
    data = data || {}; // in case of empty node
    return new Space(data.height || 0, data.width || 0, data.points || []);
  },
  instanceOf: Space
  // `represent` is omitted here. So, Space objects will be dumped as is.
  // That is regular mapping with three key-value pairs but with !space tag.
});

function resolveJavascriptUndefined() {
  return true;
}

function constructJavascriptUndefined() {
  /*eslint-disable no-undefined*/
  return undefined;
}

function representJavascriptUndefined() {
  return '';
}

function isUndefined(object) {
  return typeof object === 'undefined';
}

var UndefYamlType = new yaml.Type('!undefined', {
  kind: 'scalar',
  resolve: resolveJavascriptUndefined,
  construct: constructJavascriptUndefined,
  predicate: isUndefined,
  represent: representJavascriptUndefined
});
// After our types are defined, it's time to join them into a schema.

// var CUSTOM_SCHEMA = yaml.Schema.create([ SpaceYamlType, PointYamlType, UndefYamlType ]);

var CUSTOM_SCHEMA = yaml.Schema.create(yaml.DEFAULT_SAFE_SCHEMA, [ SpaceYamlType, PointYamlType, UndefYamlType ]);

// 'tag:yaml.org,2002:js/undefined'

// do not execute the following if file is required (http://stackoverflow.com/a/6398335)
if (require.main === module) {
    console.log("dn", __dirname)
  // And read a document using that schema.
  fs.readFile(path.join(__dirname, 'custom,yaml'), 'utf8', function (error, data) {
    var loaded;

    if (!error) {
      loaded = yaml.load(data);
      console.log(util.inspect(loaded, false, 20, true));
    } else {
      console.error(error.stack || error.message || String(error));
    }
  });
}

function customLoad(data) {
    return yaml.safeLoad(data, {schema:CUSTOM_SCHEMA});
}
function customDump(data) {
    return yaml.safeDump(data, {schema:CUSTOM_SCHEMA});
}

// There are some exports to play with this example interactively.
module.exports.Point         = Point;
module.exports.Space         = Space;
module.exports.PointYamlType = PointYamlType;
module.exports.SpaceYamlType = SpaceYamlType;
module.exports.UndefYamlType = UndefYamlType;
module.exports.CUSTOM_SCHEMA = CUSTOM_SCHEMA;
module.exports.dump = yaml.dump;
module.exports.load = yaml.load;
module.exports.safeDump = yaml.safeDump;
module.exports.safeLoad = yaml.safeLoad;

module.exports.customLoad = customLoad;
module.exports.customDump = customDump;
