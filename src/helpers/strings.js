
/**
 * Capitalize the first letter
 * @param  {String} s the string to capitalize
 * @return {String}   the capitalized string
 */
var capitalize = function(s){
  return s && s[0].toUpperCase() + s.slice(1);
}

/**
 * Generate a random string with a given length
 * Using from Spotify's authentication demo
 * @param  {Number} length number of chars
 * @return {String} A random string
 */
var generateRandomString = function(length) {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

export {capitalize, generateRandomString};
