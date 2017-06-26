import querystring from 'querystring';

/**
 * Generate a random string with a given length
 * Using from Spotify's authentication demo
 * @param  {Number} length number of chars
 * @return {String} A random string
 */
function generateRandomString(length) {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

/**
 * Redirects to the Spotify login URL with given query params. Also generates a
 * new random state which can be used for cookies later
 * @return null
 */
function goToLogin() {
  var scope = 'user-read-private user-read-email user-read-recently-played user-top-read';
  var client_id = 'f7dcd38e4e8e41698722f35a812618fd';
  var redirect_uri = 'http://localhost:8000/toptracks.html';
  var state = generateRandomString(16);

  var queryVals = querystring.stringify({
    response_type: 'code',
    client_id: client_id,
    scope: scope,
    redirect_uri: redirect_uri,
    state: state,
    show_dialog: true
  });
  var loginURL = 'https://accounts.spotify.com/authorize?' + queryVals;

  window.location.href = loginURL;
};

goToLogin();
