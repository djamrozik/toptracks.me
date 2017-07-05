import querystring from 'querystring';
import {generateRandomString} from './helpers/strings.js';
import {getRedirectURI} from './helpers/page.js';

/**
 * Redirects to the Spotify login URL with given query params. Also generates a
 * new random state which can be used for cookies later
 * @return null
 */
function goToSpotifyLogin() {
  var scope = 'user-top-read';
  var client_id = 'f7dcd38e4e8e41698722f35a812618fd'; // can be public
  var redirect_uri = getRedirectURI();
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

goToSpotifyLogin();
