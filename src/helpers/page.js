import querystring from 'querystring';

/**
 * Go to the home screen to login
 */
var goToHomeScreen = function() {
  window.location.href = '/';
};

/**
 * Returns an object of the URL params
 * @return {Object} URL params object
 */
var getParamObj = function() {
  const url = window.location.href;
  const params = url.split('?')[1];
  return querystring.parse(params);
};

/**
 * Sometimes for debugging it might be helpful to block a network call.
 * This will return true if 'blockCall=true' in the query params
 * @return {Boolean} should block call or not
 */
var blockCall = function() {
  return getParamObj() && getParamObj()['blockCall'] == 'true';
};

/**
 * This will return the redirect_uri used in spotify calls
 * @return {String}         redirect_uri
 */
var getRedirectURI = function() {
  if (window.location.href.indexOf('localhost') > -1) {
    return 'http://localhost:8000/toptracks.html';
  }
  return 'http://toptracks.me/toptracks.html';
}

export {goToHomeScreen, getParamObj, blockCall, getRedirectURI};
