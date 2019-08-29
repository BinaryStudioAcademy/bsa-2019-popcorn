import React from 'react';
import './AdvancedSearchSliderBlock.scss';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);

const railStyle = {
	appearance: 'none',
	width: '100%',
	background: 'orange',
	outline: 'none',
	opacity: '0.7'
};

type AdvancedSearchSliderBlockProps = {
	rangeHandler: (val?: Array<string>) => void;
	header: string;
	min: number;
	max: number;
	step: number;
	marks: object;
};

class AdvancedSearchSliderBlock extends React.Component<
	AdvancedSearchSliderBlockProps,
	{}
> {
	constructor(props) {
		super(props);
	}

	handleSliderChange = e => {
		this.props.rangeHandler(e);
	};

	render() {
		return (
			<div className="advanced-movie-search-block">
				<div className="slider-header">{this.props.header}</div>
				<div className="slider-wrp">
					<Range
						tipFormatter={value => `${value} min`}
						onChange={this.handleSliderChange}
						id="2"
						min={this.props.min}
						max={this.props.max}
						step={this.props.step}
						railStyle={railStyle}
						defaultValue={[this.props.min, this.props.max]}
						marks={this.props.marks}
					/>
				</div>
			</div>
		);
	}
}

export default AdvancedSearchSliderBlock;
