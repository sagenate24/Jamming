import React from 'react';
import './Track.css';
import { audio } from '../App/App';
import playImage from './playButton.png';
import pauseImage from './pauseButton.png';
import PlayAnimation from '../PlayAnimation/playAnimation';
import songNotFoundImg from './SongNotFound.png';

class Track extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            albumImg: this.props.track.albumImage,
            paused: true,
            playAnimation: false
        }
        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);
        this.mouseEnter = this.mouseEnter.bind(this);
        this.mouseLeave = this.mouseLeave.bind(this);
        this.playSong = this.playSong.bind(this);
    }

    renderAction() {
        if (this.props.isRemoval) {
            return <a className="Track-action" onClick={this.removeTrack}>-</a>
        }
        return <a className="Track-action" onClick={this.addTrack}>+</a>
    }

    addTrack() {
        this.props.onAdd(this.props.track);
    }

    removeTrack() {
        this.props.onRemove(this.props.track);
    }

    mouseEnter() {
        if (this.props.track.previewAudio === null) {
            this.setState({ albumImg: songNotFoundImg });
            this.props.sendUrlString(this.props.track.previewAudio);
        } else {
            this.props.sendUrlString(this.props.track.previewAudio);

            if (this.props.track.previewAudio === audio.src && this.state.paused === false) {
                this.setState({ albumImg: pauseImage });
            } else {
                this.setState({ albumImg: playImage });
            }
        }
    }

    playSong() {
        if (this.props.track.previewAudio == null) {
            window.alert('Preview audio is not available');
        } else {
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
    }

    mouseLeave() {
        this.setState({ albumImg: `${this.props.track.albumImage}` });
    }

    renderPlayAnimation() {
        if (this.state.playAnimation === true && this.props.track.previewAudio === audio.src) {
            return <PlayAnimation />;
        }
    }

    render() {
        return (
            <div className="Track">
                <img src={this.state.albumImg} alt={"Album"} onClick={this.playSong} onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave} />
                <div className="Track-information">
                    <h3>{this.props.track.name}</h3>
                    <p>{this.props.track.artist} | {this.props.track.albumName}</p>
                </div>
                {this.renderPlayAnimation()}
                {this.renderAction()}
            </div>
        );
    }
}


export default Track;