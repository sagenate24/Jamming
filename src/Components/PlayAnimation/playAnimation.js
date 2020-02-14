import React from 'react';
import { ScaleLoader } from 'react-spinners';
import './playAnimation.css';

class PlayAnimation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true
        }
    }
    render() {
        return (
            <div className='playAnimation'>
                <ScaleLoader
                    color={'rgba(29, 28, 28, 0.708)'}
                    loading={this.state.loading}
                    height={8}
                    radius={0}
                />
            </div>
        );
    }
}

export default PlayAnimation;