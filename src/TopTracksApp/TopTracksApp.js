import React, { Component } from 'react';
import querystring from 'querystring';
import {getAllTopItems} from './../helpers/topItems.js';
import {goToLogin} from './../helpers/page.js';

class TopTracksApp extends Component {
  constructor (props) {
    super(props);
    this.state = {
      showSpinner: true
    };
  };

  componentDidMount() {
    getAllTopItems(function(error, data) {
      if (error && error.errorMessage && error.errorMessage.indexOf('redirect') > -1) {
        return goToLogin();
      }
      if (data) {
        this.setState({
          topItems: data,
          showSpinner: false
        });
      } else {
        console.log('Did not recieve any data from getAllTopItems');
      }
    }.bind(this));
  };

  render() {
    return (
      <div className="top-tracks-page">
        {this.state.showSpinner ? this.renderLoadingScreen() : this.renderTopTracksScreen()}
      </div>
    );
  };

  renderLoadingScreen() {
    return (
      <div className="loading-screen">
        <div className="loading-module">
          <img src="/images/loader_animal.gif"/>
          Loading data...
        </div>
      </div>
    )
  };

  renderTopTracksScreen() {
    return (
      <div className="top-tracks-screen">
        Top tracks screen
      </div>
    )
  };
}

export default TopTracksApp;
