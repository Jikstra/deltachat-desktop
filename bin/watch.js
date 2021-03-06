var watch = require('glob-watcher')
var child = require('child_process')

watch([
  './src/',
  './_locales/*.json',
  './conversations/build'
], function (done) {
  var p = child.spawn('npm', ['run', 'build-js'])
  p.stdout.pipe(process.stdout)
  p.stderr.pipe(process.stderr)
  p.on('close', done)
})

watch([
  './conversations',
  '!./conversations/build'
], function (done) {
  var p = child.spawn('npm', ['run', 'build-conversations'])
  p.stdout.pipe(process.stdout)
  p.stderr.pipe(process.stderr)
  p.on('close', done)
})
