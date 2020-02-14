import React from 'react';
import './SongTrack.css';
import { audio } from '../App/App';
import playImage from '../Track/playButton.png';
import pauseImage from '../Track/pauseButton.png';
import PlayAnimation from '../PlayAnimation/playAnimation';

class SongTrack extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            songLength: 0,
            albumImg: `${this.props.track.albumImage}`,
            paused: true,
            playAnimation: false
        }
        this.displaySongLength = this.displaySongLength.bind(this);
        this.mouseLeave = this.mouseLeave.bind(this);
        this.mouseEnter = this.mouseEnter.bind(this);
        this.playSong = this.playSong.bind(this);
    }

    displaySongLength() {
        let y = this.props.track.duration / 60000;
        let factor = Math.pow(10, 2);
        let newSongLength = Math.round(y * factor) / factor;
        let hrs = parseInt(Number(newSongLength), 10);
        let min = Math.round((Number(newSongLength) - hrs) * 60);
        let songLengthInMin = hrs + ':' + min;
        if (songLengthInMin.length < 4) {
            songLengthInMin += 0;
            this.setState({ songLength: songLengthInMin });
        }
        this.setState({ songLength: songLengthInMin });
    }

    mouseEnter() {
        this.props.sendUrlString(this.props.track.previewAudio);
        if (this.props.track.previewAudio === audio.src && this.state.paused === false) {
            this.setState({ albumImg: pauseImage });
        } else {
            this.setState({ albumImg: playImage });
        }
    }

    playSong() {
        if (this.props.track.previewAudio === audio.src && this.state.paused === false) {
            this.setState({
                albumImg: playImage,
                paused: true,
                playAnimation: false
            });
            this.props.playAudio();
        } else {
            this.setState({
                albumImg: pauseImage,
                paused: false,
                playAnimation: true
            });
            setTimeout(() => {
                this.setState({ playAnimation: false });
            }, 30000);
            this.props.playAudio();
        }
    }

    renderPlayAnimation() {
        if (this.state.playAnimation === true && this.props.track.previewAudio === audio.src) {
            return <PlayAnimation />;
        }
    }

    mouseLeave() {
        this.setState({ albumImg: `${this.props.track.albumImage}` });
    }

    render() {
        return (
            <div className="songTrack" onLoad={this.displaySongLength}>
                <img style={{ height: '32px' }} src={this.state.albumImg} alt={"Album"} onClick={this.playSong} onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave} />
                <div className="songTrack-information">
                    <h4>{this.props.track.songName}<span>{this.props.track.artistsName} | {this.state.songLength} 🎧</span></h4>
                    <div className="animation">{this.renderPlayAnimation()}</div>
                </div>
            </div>
        );
    }
}

export default SongTrack;