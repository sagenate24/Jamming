import React from 'react';
import './Playlist.css';

import TrackList from '../TrackList/TrackList';
import Popup from 'reactjs-popup';

class Playlist extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            popupMessage: false
        }

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleSaveToPlaylists = this.handleSaveToPlaylists.bind(this);
    }

    handleNameChange(e) {
        this.props.onNameChange(e.target.value);
    }

    handleSaveToPlaylists() {
        console.log(this.props.playlistName)
        if (this.props.playlistTracks.length !== 0) {
            this.props.onSave();
        } else {
            alert(`Sorry, empty playlist.. Search and add songs first to save "${this.props.playlistName}" to your Spotify account.`);
        }
    }

    render() {
        return (
            <div className="Playlist">
                <input value={this.props.playlistName} onChange={this.handleNameChange} />
                <div className="songListGenerator">
                <TrackList tracks={this.props.playlistTracks} onRemove={this.props.onRemove}
                    isRemoval={true} />
                    </div>
                <Popup
                    trigger={<button className="Playlist-save"> SAVE TO SPOTIFY </button>}
                    position="top center"
                >
                    {close => (
                        <div className='popUp-info'>
                            <p style={{ color: '#000', fontSize: '12px' }}>Are you sure you want to save to spotify?</p>
                            <button
                                className="button-cancel"
                                onClick={() => {
                                    close();
                                }}>cancel</button>
                            <button
                                className="button-yes"
                                onClick={() => {
                                    this.handleSaveToPlaylists();
                                    close();
                                }}>yes</button>
                        </div>
                    )}
                </Popup>
            </div>
        );
    }
}

export default Playlist;