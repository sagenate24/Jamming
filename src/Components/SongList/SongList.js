import React from 'react';
import SongTrack from '../SongTrack/SongTrack';
import './SongList.css';
import { audio } from '../App/App';

class SongList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            songUrl: '',
            playImage: '',
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
            <div className="SongList">
                {
                    this.props.songs.map(track => {
                        return <SongTrack 
                            track={track}
                            key={track.id}
                            sendUrlString={this.sendUrlString}
                            playAudio={this.playTrialAudio}
                        />
                    })
                }
            </div>
        );
    }

}

export default SongList;