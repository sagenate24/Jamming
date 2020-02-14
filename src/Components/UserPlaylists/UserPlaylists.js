import React from 'react';
import './UserPlaylists.css';

import UserTrackList from '../UserTrackList/UserTrackList';

class UserPlaylists extends React.Component {
    render() {
        return (
            <div className="UserPlaylists">
                <h2>{this.props.userName}'s playlists</h2>
                <UserTrackList userPlaylist={this.props.userPlaylist} />
            </div>
        );
    }
}

export default UserPlaylists;