import React, { Component } from 'react';
import querystring from 'querystring';
import {getAllTopItems} from './../helpers/topItems.js';
import {goToHomeScreen} from './../helpers/page.js';
import {capitalize} from './../helpers/strings.js';

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
        return goToHomeScreen();
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
    var topItemsCategory = type + capitalize(term) + 'Term';
    var topItemsInCategory = this.state.topItems[topItemsCategory]['items']

    return (
      <div className="top-items">
        {topItemsInCategory.map(function(object, i){
          return (
            <div className="top-item" key={i}>
              <span className="top-item-rank">{(i+1)}</span>
              <img className="top-item-image" src={this.getImageURL(object)} />
              {object.type === "track" ? this.renderTrack(object) : this.renderArtist(object)}
              <span className="top-item-play">
                <i className="fa fa-play-circle fa-2x top-item-play-icon" aria-hidden="true" onClick={() => this.playItem(object)}></i>
              </span>
            </div>
          )
        }.bind(this))}
      </div>
    );
  };

  renderArtist(artist) {
    return (
      <span className="top-item-data">
        <span className="artist-name">{artist.name}</span>
        <span className="artist-genre">Genres: {this.getGenres(artist)}</span>
      </span>
    )
  }

  renderTrack(track) {
    return (
      <span className="top-item-data">
        <span className="track-name">{track.name}</span>
        <span className="track-artist">{this.getArtistName(track)}</span>
      </span>
    )
  }

  getArtistName(track) {
    if (track.artists && track.artists[0]) {
      return track.artists[0].name;
    }
  }

  getGenres(artist) {
    let genres = artist.genres;

    if (!genres) {
      return "N/A";
    }

    if (genres.length > 3) {
      genres = genres.splice(0, 4);
      genres.push('...')
    }

    genres = genres.map(function(genre) {
      return capitalize(genre)
    });

    return genres.join(', ');
  }

  getImageURL(topItem) {
    if (topItem.type === "track") {
      if (topItem.album && topItem.album.images && topItem.album.images[0]) {
        return topItem.album.images[0].url;
      }
    }

    if (topItem.type === "artist") {
      if (topItem.images && topItem.images[0]) {
        return topItem.images[0].url;
      }
    }

    return "";
  }

  handleTermChange(newTerm) {
    this.setState({
      selectedTerm: newTerm
    })
  }

  playItem(object) {
    if (object.type === "artist") {
      window.open(object.external_urls.spotify,'_blank');
    }
    if (object.type === "track") {
      window.open(object.external_urls.spotify,'_blank');
    }
  }
}

export default TopTracksApp;
