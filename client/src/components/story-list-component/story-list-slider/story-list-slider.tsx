import React, { Component } from 'react';
import "./story-list-slider.scss"
interface IStoryListSlider {
    scrollRight: () => void,
    scrollLeft: () => void
}
class StoryListSlider extends Component<IStoryListSlider> {
    render() {
        const { scrollRight, scrollLeft } = this.props;
        return (<div className="slider-wrapper">
            <div onClick={scrollLeft} className="slider-left"> <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.09874 7.23922L6.75955 12.9C6.89284 13.0333 7.1066 13.0333 7.23988 12.9C7.37316 12.7668 7.37316 12.553 7.23988 12.4197L1.82049 7.00031L7.23988 1.58092C7.37317 1.44763 7.37317 1.23388 7.23988 1.10059C7.1745 1.03521 7.08648 1 7.00098 1C6.91547 1 6.82745 1.03269 6.76207 1.10059L1.10125 6.76141C0.967968 6.89218 0.967968 7.10845 1.09874 7.23922Z" fill="black" fillOpacity="0.11" stroke="#E3E3E3" />
            </svg>
            </div>
            <div onClick={scrollRight} className="slider-right"><svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.24111 6.76078L1.58029 1.09996C1.44701 0.966679 1.23325 0.966679 1.09996 1.09996C0.966679 1.23325 0.966679 1.44701 1.09996 1.58029L6.51936 6.99969L1.09996 12.4191C0.966679 12.5524 0.966679 12.7661 1.09996 12.8994C1.16535 12.9648 1.25337 13 1.33887 13C1.42437 13 1.51239 12.9673 1.57778 12.8994L7.23859 7.23859C7.37188 7.10782 7.37188 6.89155 7.24111 6.76078Z" fill="black" fillOpacity="0.7" stroke="black" strokeOpacity="0.7" />
            </svg>
            </div>
        </div>);
    }
}

export default StoryListSlider;