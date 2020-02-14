import React from 'react';
import './App.css';

import SpotifyLogo from './SpotifyIcon.png';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';
import UserPlaylists from '../UserPlaylists/UserPlaylists';

export const audio = new Audio();

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      playlistTracks: [],
      playlistName: 'new playlist',
      userProfileName: '',
      userPlaylists: [],
      userTracksInPlaylists: [],
      zeroResults: false,
      badSearchTerm: '',
      hompage: true
    };

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
    this.showUser = this.showUser.bind(this);
    this.returnEmptySearch = this.returnEmptySearch.bind(this);
  }

  componentDidMount() {
    this.showUser();
  }

  addTrack(track) {
    if (this.state.playlistTracks.find(savedTrack =>
      savedTrack.id === track.id)) {
      return;
    }
    //add track to new playlist
    let newPlaylistTracks = this.state.playlistTracks;
    newPlaylistTracks.push(track);
    this.setState({ playlistTracks: newPlaylistTracks });

    //Remove track from search results after added to new playlist
    let newSearchResults = this.state.searchResults.filter(item =>
      item.id !== track.id);
    this.setState({ searchResults: newSearchResults });
  }

  removeTrack(track) {
    let newPlaylistTracks = this.state.playlistTracks.filter(item =>
      item.id !== track.id);
    this.setState({ playlistTracks: newPlaylistTracks });
  }

  updatePlaylistName(name) {
    this.setState({ playlistName: name });
  }

  savePlaylist() {
    // if (window.confirm("Are you sure you want to save this playlist to your spotify account?")) {
    let trackURI = this.state.playlistTracks.map(track => track.uri);
    Spotify.savePlaylist(this.state.playlistName, trackURI).then(() => {
      this.setState({
        playlistTracks: [],
        playlistName: 'new playlist'
      });
      this.showUser();
    })
  }

  search(searchTerm) {
    Spotify.search(searchTerm).then(results => {
      // console.log(results);
      if (results.length !== 0) {
        this.setState({
          searchResults: results,
          zeroResults: false
        });
      }
      else {
        this.setState({
          zeroResults: true,
          badSearchTerm: searchTerm
        });
      }
    })
  }

  returnEmptySearch(searchTerm) {
    if (this.state.zeroResults === true) {
      return <h3 className='zeroResults'>0 results found for <span>'{this.state.badSearchTerm}'</span></h3>
    }
  }

  showUser() {
    Spotify.getUserProfile().then(results => {
      this.setState({ userProfileName: results });
    });
    Spotify.getUserPlaylist().then(results => {
      this.setState({ userPlaylists: results });
    })
  }

  render() {
    return (
      <div className="App">
        <SearchBar onSearch={this.search} />
        <div className="App-container">
          <div className="App-playlist">
            {this.returnEmptySearch()}
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} />
            <Playlist playlistTracks={this.state.playlistTracks} playlistName={this.state.playlistName}
            onRemove={this.removeTrack} onNameChange={this.updatePlaylistName} onSave={this.savePlaylist} />
          </div>
          <div className="App-user-playlist">
            <UserPlaylists userName={this.state.userProfileName} userPlaylist={this.state.userPlaylists} />
          </div>
        </div>
        <div className="footer">
          <p>Nathan Sage ☺︎</p>
          <p className='SpotifySign'>Created using the Spotify Api <span><img className='SpotifyLogo' src={SpotifyLogo} alt='SpotifyLogo' /></span></p>
        </div>
      </div>
    );
  }
}

export default App;