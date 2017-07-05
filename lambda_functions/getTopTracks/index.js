const request = require('request');
const async = require('async');

// this can be public
const client_id = 'f7dcd38e4e8e41698722f35a812618fd';

var getTopItems = function(accessToken, type, timeRange, callback) {
  const limit = 50;
  var options = {
    url: `https://api.spotify.com/v1/me/top/${type}?limit=${limit}&time_range=${timeRange}`,
    headers: { 'Authorization': 'Bearer ' + accessToken },
    json: true
  };

  request.get(options, function(error, response, body) {
    if (error){
      return callback('Error making request, redirect')
    } else {
      return callback(null, body);
    }
  });
}

exports.handler = (event, context, callback) => {
  const code = event.code;
  const redirect_uri = event.redirect_uri;

  if (!code) {
    return callback('No authorization code provided, redirect.');
  }

  var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    form: {
      code: code,
      redirect_uri: redirect_uri,
      grant_type: 'authorization_code'
    },
    headers: {
      'Authorization': 'Basic ' + (new Buffer(client_id + ':' + process.env.SPOTIFY_SECRET).toString('base64'))
    },
    json: true
  };

  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      var accessToken = body.access_token;
      async.parallel({
        artistsShortTerm: getTopItems.bind(null, accessToken, 'artists', 'short_term'),
        artistsMediumTerm: getTopItems.bind(null, accessToken, 'artists', 'medium_term'),
        artistsLongTerm: getTopItems.bind(null, accessToken, 'artists', 'long_term'),
        tracksShortTerm: getTopItems.bind(null, accessToken, 'tracks', 'short_term'),
        tracksMediumTerm: getTopItems.bind(null, accessToken, 'tracks', 'medium_term'),
        tracksLongTerm: getTopItems.bind(null, accessToken, 'tracks', 'long_term')
      }, function(error, result) {
        if (error) {
          return callback(JSON.stringify(error))
        }
        return callback(null, result);
      });
    } else {
      return callback('Error making auth, redirect');
    }
  });
};
