import $ from "jquery";
import {getParamObj, blockCall} from './page.js'
import {getRedirectURI} from './page.js';

/**
 * Makes the call to the lambda function which authenticates (using the client secret)
 * and then makes a call to the API and returns that data
 * @return {Object} List of top tracks/artist by section
 */
var getAllTopItems = function(callback) {
  const env = 'staging'; // dynamically set later
  const request_url = `https://9xvgs3p174.execute-api.us-east-1.amazonaws.com/${env}/top_tracks`;

  // don't make a call, just return
  if (blockCall()) {
    return callback();
  }

  // set the params
  const params = getParamObj();
  params['redirect_uri'] = getRedirectURI();

  $.ajax({
    url: request_url,
    data: params,
    beforeSend: function(xhr){xhr.setRequestHeader('Access-Control-Allow-Origin', 'true')},
    success: function(data) {
      if (data.errorMessage) {
        return callback(data);
      }
      return callback(null, data);
    },
    error: function(xhr, status, err) {
      return callback(err);
    }
  });
};

export {getAllTopItems};
