var path = require('path');
var test = require('tape');
var matcher = require('../matcher');

test('extracts filename', function(t) {
  var data = matcher.process(matcher.exec('<<< test.js'));

  t.plan(4);
  t.equals(data.fileName, path.resolve('test.js'));
  t.equals(data.fileType, 'js');
  t.equals(data.rangeStart, undefined);
  t.equals(data.rangeEnd, undefined);
});

test('handles range specification', function(t) {
  var data = matcher.process(matcher.exec('<<< test.js[1:10]'));

  t.plan(4);
  t.equals(data.fileName, path.resolve('test.js'));
  t.equals(data.fileType, 'js');
  t.equals(data.rangeStart, 1);
  t.equals(data.rangeEnd, 10);
});

test('handles range specification [n:]', function(t) {
  var data = matcher.process(matcher.exec('<<< test.js[1:]'));

  t.plan(4);
  t.equals(data.fileName, path.resolve('test.js'));
  t.equals(data.fileType, 'js');
  t.equals(data.rangeStart, 1);
  t.equals(data.rangeEnd, undefined);
});

test('handles range specification [:n]', function(t) {
  var data = matcher.process(matcher.exec('<<< test.js[:10]'));

  t.plan(4);
  t.equals(data.fileName, path.resolve('test.js'));
  t.equals(data.fileType, 'js');
  t.equals(data.rangeStart, undefined);
  t.equals(data.rangeEnd, 10);
});

test('handles file type override', function(t) {
  var data = matcher.process(matcher.exec('<<<ts test.js'));

  t.plan(4);
  t.equals(data.fileName, path.resolve('test.js'));
  t.equals(data.fileType, 'ts');
  t.equals(data.rangeStart, undefined);
  t.equals(data.rangeEnd, undefined);
});

test('handles file type override and range', function(t) {
  var data = matcher.process(matcher.exec('<<<ts test.js[1:10]'));

  t.plan(4);
  t.equals(data.fileName, path.resolve('test.js'));
  t.equals(data.fileType, 'ts');
  t.equals(data.rangeStart, 1);
  t.equals(data.rangeEnd, 10);
});