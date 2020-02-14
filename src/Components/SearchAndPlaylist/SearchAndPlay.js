// import React from 'react';
// import { Link } from 'react-router-dom';

// import SearchResults from '../SearchResults/SearchResults';
// import Playlist from '../Playlist/Playlist';
// import UserPlaylists from '../UserPlaylists/UserPlaylists';

// class SearchAndPlay extends React.Component {
//     render() {
//         return (
//             <div>
//                 <div>
//                     <SearchResults searchResults={this.props.searchResults} onAdd={this.props.addTrack} />
//                     <Playlist playlistTracks={this.props.playlistTracks} playlistName={this.props.playlistName}
//                         onRemove={this.props.removeTrack} onNameChange={this.props.updatePlaylistName} onSave={this.props.savePlaylist} />
//                 </div>
//                 <div className="App-user-playlist">
//                     <UserPlaylists userName={this.state.userProfileName} userPlaylist={this.state.userPlaylists} />
//                 </div>
//                 <div className="footer">
//                     <p>Nathan Sage ☺︎</p>
//                 </div>
//             </div>
//         );
//     }
// }

// export default SearchAndPlay;