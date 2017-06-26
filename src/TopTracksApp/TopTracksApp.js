import React, { Component } from 'react';
import querystring from 'querystring';
import {getAllTopItems} from './../helpers/topItems.js';
import {goToLogin} from './../helpers/page.js';

class TopTracksApp extends Component {
  constructor (props) {
    super(props);
    this.state = {
      showSpinner: true,
      selectedTerm: 'short'
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
      <div className="top-items-page">
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
    const class_short_term = this.state.selectedTerm == 'short' ? "select-term-tab-selected" : "";
    const class_medium_term = this.state.selectedTerm == 'medium' ? "select-term-tab-selected" : "";
    const class_long_term = this.state.selectedTerm == 'long' ? "select-term-tab-selected" : "";

    return (
      <div className="top-items-screen">
        <div className="select-term-tabs">
          <div className={`select-term-tab ${class_short_term}`} onClick={() => this.handleTermChange('short')}>
            <span>SHORT TERM</span>
          </div>
          <div className={`select-term-tab ${class_medium_term}`} onClick={() => this.handleTermChange('medium')}>
            <span>MEDIUM TERM</span>
          </div>
          <div className={`select-term-tab ${class_long_term}`} onClick={() => this.handleTermChange('long')}>
            <span>LONG TERM</span>
          </div>
        </div>
        <div className="top-items-body">
          <div className="top-tracks">
            <p className="header">TOP TRACKS</p>
            {this.renderTopItems('tracks')}
          </div>
          <div className="top-artists">
            <p className="header">TOP ARTISTS</p>
            {this.renderTopItems('artists')}
          </div>
        </div>
      </div>
    )
  };

  renderTopItems(type) {
    // only render this part once the data exists
    if (!this.state || !this.state.topItems) {
      return null;
    }

    var term = this.state.selectedTerm;
    var topItemsCategory = type + this.capitalize(term) + 'Term';
    var topItemsInCategory = this.state.topItems[topItemsCategory]['items']

    return (
      <div className="top-items">
        {topItemsInCategory.map(function(object, i){
          return (
            <div className="top-item" key={i}>
              {object.name}
            </div>
          )
        })}
      </div>
    );
  };

  handleTermChange(newTerm) {
    this.setState({
      selectedTerm: newTerm
    })
  }

  capitalize(s){
    return s && s[0].toUpperCase() + s.slice(1);
  }
}

export default TopTracksApp;
