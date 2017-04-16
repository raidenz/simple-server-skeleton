/**
 * Try to solving
 * relative path problem ./../../../../../
 * http://stackoverflow.com/questions/10860244/how-to-make-the-require-in-node-js-to-be-always-relative-to-the-root-folder-of-t
 * require('.denRoot')
 * call by
 * denRoot('/lib/lol');
 */
var denRoot = __dirname;

module.exports = GLOBAL.projRequire = function(module) {
  return require(denRoot + module);
}
