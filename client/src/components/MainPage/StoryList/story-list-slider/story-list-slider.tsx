import React, { Component } from 'react';
import './story-list-slider.scss';
import { ReactComponent as SliderLeftIcon } from '../../../../assets/icons/storyList/sliderLeft-icon.svg';
import { ReactComponent as SliderRightIcon } from '../../../../assets/icons/storyList/sliderRight-icon.svg';

interface IStoryListSlider {
	scrollRight: () => void;
	scrollLeft: () => void;
}
class StoryListSlider extends Component<IStoryListSlider> {
	render() {
		const { scrollRight, scrollLeft } = this.props;
		return (
			<div className="slider-wrapper">
				<div onClick={scrollLeft} className="slider-left">
					<SliderLeftIcon />
				</div>
				<div onClick={scrollRight} className="slider-right">
					<SliderRightIcon />
				</div>
			</div>
		);
	}
}

export default StoryListSlider;
