import React from 'react';
import './UserTrack.css';
import Spotify from '../../util/Spotify';
import SongList from '../SongList/SongList';

class UserTrack extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            playlistSongs: [],
            buttonName: 'Display Songs',
            dropDown: false,
            dropDownStyle: 'UserTrack'
        }
        this.displayTracks = this.displayTracks.bind(this);
        this.saveTracks = this.saveTracks.bind(this);
        this.renderSongList = this.renderSongList.bind(this);
    }

    displayTracks() {
        let accessToken = Spotify.getAccessToken();
        const headers = { Authorization: `Bearer ${accessToken}` };

        return fetch(this.props.tracks, { headers: headers }
        ).then(response => response.json()
        ).then(jsonResponse => {
            // console.log(jsonResponse.items[0])
            return jsonResponse.items.map(smallTracks => ({
                id: smallTracks.track.id,
                albumImage: smallTracks.track.album.images[2].url,
                songName: smallTracks.track.name,
                previewAudio: smallTracks.track.preview_url,
                artistsName: smallTracks.track.artists[0].name,
                duration: smallTracks.track.duration_ms,
                previewUrl: smallTracks.track.preview_url
            }))
        })
    }

    saveTracks(track) {
        if (!this.state.dropDown) {
            this.displayTracks().then(results => {
                this.setState({
                    playlistSongs: results,
                    dropDown: true,
                    dropDownStyle: 'UserTrack2'
                });
            });
        } else if (this.state.dropDown) {
            this.setState({
                dropDown: false,
                dropDownStyle: 'UserTrack'
            });
        }
    }

    renderSongList() {
        if (!this.state.dropDown === false) {
            return <SongList songs={this.state.playlistSongs} />
        }
    }

    render() {
        return (
            <div className="trackContainer">
                <div className={this.state.dropDownStyle} onClick={this.saveTracks} >
                    <img src={this.props.item.image} alt={"UserAlbumImg"} />
                    <div className="UserTrack-information">
                        <h3>{this.props.item.name}</h3>
                    </div>
                </div>
                {this.renderSongList()}
            </div>
        );
    }
}

export default UserTrack;