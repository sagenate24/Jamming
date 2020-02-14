import React from 'react';
import './UserTrackList.css';

import UserTrack from '../UserTrack/UserTrack';

class UserTrackList extends React.Component {
    render() {
        return (
            <div className="userTrackList">
                {
                    this.props.userPlaylist.map(item => {
                        return <UserTrack item={item} key={item.id} tracks={item.tracks.href} />
                    })
                }
            </div>
        );
    }
}

export default UserTrackList;