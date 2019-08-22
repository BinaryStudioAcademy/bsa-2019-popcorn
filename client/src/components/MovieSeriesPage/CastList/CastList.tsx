import React from 'react';
import CastItem from '../CastItem/CastItem';
import './CastList.scss';

type CastListProps = {
	cast: any;
};

type CastListState = {
	isDown: boolean;
	startX: number;
	scrollLeft: number;
	class: string;
};

class CastList extends React.Component<CastListProps, CastListState> {
	constructor(props) {
		super(props);
		this.state = {
			isDown: false,
			startX: 0,
			scrollLeft: 0,
			class: ''
		};
	}
	onMouseDown = event => {
		const scroll: any = this.refs.scroll;
		const startX = event.pageX - scroll.offsetLeft;
		const scrollLeft = scroll.scrollLeft;
		this.setState({ startX, scrollLeft, isDown: true, class: 'active' });
	};

	onMouseLeave = () => {
		this.setState({ isDown: false, class: '' });
	};

	onMouseMove = event => {
		const { startX, scrollLeft, isDown } = this.state;
		const scroll: any = this.refs.scroll;
		if (!isDown) return;
		event.preventDefault();
		const x = event.pageX - scroll.offsetLeft;
		const walk = x - startX;
		scroll.scrollLeft = scrollLeft - walk;
	};

	render() {
		return (
			<div className={'cast-list'}>
				<div className={'cast-list-header cross-line'}>
					<span>Main cast</span>
				</div>
				<div
					ref="scroll"
					className={`cast-items-container ${this.state.class}`}
					onMouseDown={this.onMouseDown}
					onMouseLeave={this.onMouseLeave}
					onMouseMove={this.onMouseMove}
					onClickCapture={event => {
						if (this.state.class === 'active') event.stopPropagation();
						this.setState({ isDown: false, class: '' });
					}}
				>
					{this.props.cast.map(el => {
						return <CastItem castItemInfo={el} />;
					})}
				</div>
			</div>
		);
	}
}

export default CastList;
