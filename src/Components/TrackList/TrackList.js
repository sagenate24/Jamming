import React from 'react';
import './TrackList.css';
import { audio } from '../App/App';

import Track from '../Track/Track';

class TrackList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            songUrl: '',
            paused: true
        }
        this.sendUrlString = this.sendUrlString.bind(this);
        this.playTrialAudio = this.playTrialAudio.bind(this);
    }

    sendUrlString(value) {
        this.setState({ songUrl: value });
    }

    playTrialAudio() {
        if (audio.src === this.state.songUrl && this.state.paused === false) {
            audio.pause();
            this.setState({ paused: true });
        } else {
            audio.src = this.state.songUrl;
            audio.play();
            this.setState({ paused: false });
        }
    }

    render() {
        return (
            <div className="TrackList">
                {this.props.tracks.map(track => {
                    return <Track
                        track={track}
                        key={track.id}
                        onAdd={this.props.onAdd}
                        onRemove={this.props.onRemove}
                        isRemoval={this.props.isRemoval}
                        sendUrlString={this.sendUrlString}
                        playAudio={this.playTrialAudio}
                    />
                })
                }
            </div>
        );
    }
}

export default TrackList;