import React, { Component } from 'react';
import querystring from 'querystring';
import {getAllTopItems} from './../helpers/topItems.js';
import {goToHomeScreen} from './../helpers/page.js';
import {capitalize} from './../helpers/strings.js';

class TopTracksApp extends Component {
  constructor (props) {
    super(props);
    this.state = {
      itemType: 'artists',
      showSpinner: true,
      timeRange: 'short'
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
          <img src="/images/loader_animal_white.gif"/>
          Loading data...
        </div>
      </div>
    )
  };

  renderTopTracksScreen() {

    return (
      <div className="top-items-screen">
        <div className="top-items-header">
          <div className="dropdown-wrapper time-range-dropdown">
            <select value={this.state.timeRange} onChange={this.handleTimeRangeChange.bind(this)}>
              <option value="short">Short Term (4 weeks)</option>
              <option value="medium">Medium Term (6 months)</option>
              <option value="long">Long Term (Years)</option>
            </select>
          </div>
          <div className="dropdown-wrapper item-type-dropdown">
            <select value={this.state.itemType} onChange={this.handleItemTypeChange.bind(this)}>
              <option value="artists">Artists</option>
              <option value="tracks">Tracks</option>
            </select>
          </div>
        </div>
        <div className="top-items-body">
          {this.renderTopItems(this.state.itemType)}
        </div>
        <div className="top-items-footer">
          <span className="copyright">
            &copy; TopTracks.me
          </span>
          &bull;
          <span className="about-link">
            <a href="/about.html">About</a>
          </span>
        </div>
      </div>
    )
  };

  renderTopItems(type) {
    // only render this part once the data exists
    if (!this.state || !this.state.topItems) {
      return null;
    }

    var term = this.state.timeRange;
    var topItemsCategory = type + capitalize(term) + 'Term';
    var topItemsInCategory = this.state.topItems[topItemsCategory]['items']

    return (
      <div className="top-items">
        <div className="type-header header-center">
          {`Top ${capitalize(type)}`}
        </div>
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

    // capitalize each genre (looks better)
    genres = genres.map(function(genre) {
      return capitalize(genre)
    });

    // limit to four items
    if (genres.length > 3) {
      genres = genres.splice(0, 4);
      return genres.join(', ') + ' ...';
    }

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

  handleItemTypeChange(event) {
    this.setState({
      itemType: event.target.value
    })
  }

  handleTimeRangeChange(event) {
    this.setState({
      timeRange: event.target.value
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
