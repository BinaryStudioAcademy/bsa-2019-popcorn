import React from 'react';
import StoryVotingOption from '../StoryVotingOption/StoryVotingOption';
import './StoryVoting.scss';
import Draggable from 'react-draggable';
import IVoting from '../MainPage/StoryList/IVoting';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';

type StoryVotingProps = {
	header: string;
	options: Array<{
		body: string;
		votingOptionReactions: any[];
	}>;
	deltaPositionForHeader: {
		x: number;
		y: number;
	};
	deltaPositionForOptionBlock: {
		x: number;
		y: number;
	};
	backToEditor?: (
		deltaHead: { x: number; y: number },
		deltaOptions: { x: number; y: number }
	) => void;
	backColor: { r: string; g: string; b: string; a: string } | string;
	backgroundImage: string;
	backgroundColor: string;
	backImage?: string;
	image_url?: string;
	userId: string;
	createVoting?: (voting: IVoting) => any;
	inEditor: boolean;
	fontColor: string;
	saveVotingReaction?: (optionId: string) => any;
	id?: string;
};

type StoryVotingState = {
	answerSelected: boolean;
	inEditor: boolean;
	deltaPositionHead: { x: number; y: number };
	deltaPositionOptionBlock: { x: number; y: number };
	redirect: boolean;
};

const firstRadius = '28px 0 0 28px';

const lastRadius = '0 28px 28px 0';

class StoryVoting extends React.Component<StoryVotingProps, StoryVotingState> {
	constructor(props) {
		super(props);
		this.state = {
			answerSelected: false,
			inEditor: props.inEditor,
			deltaPositionHead: {
				x: this.props.deltaPositionForHeader.x,
				y: this.props.deltaPositionForHeader.y
			},
			deltaPositionOptionBlock: {
				x: this.props.deltaPositionForOptionBlock.x,
				y: this.props.deltaPositionForOptionBlock.y
			},
			redirect: false
		};
		this.onAnswerSelect = this.onAnswerSelect.bind(this);
		this.handleDragHead = this.handleDragHead.bind(this);
		this.handleDragOptionBlock = this.handleDragOptionBlock.bind(this);
		this.calculatePositions = this.calculatePositions.bind(this);
		this.createStoryVotingOptions = this.createStoryVotingOptions.bind(this);
	}

	onAnswerSelect() {}

	handleDragHead(e, ui) {
		const { x, y } = this.state.deltaPositionHead;
		this.setState({
			...this.state,
			deltaPositionHead: {
				x: x + ui.deltaX,
				y: y + ui.deltaY
			}
		});
	}

	handleDragOptionBlock(e, ui) {
		const { x, y } = this.state.deltaPositionOptionBlock;
		this.setState({
			...this.state,
			deltaPositionOptionBlock: {
				x: x + ui.deltaX,
				y: y + ui.deltaY
			}
		});
	}

	calculatePositions() {
		const headerPosition = {
			top: this.state.deltaPositionHead.y,
			left: this.state.deltaPositionHead.x
		};
		const buttonsPosition = {
			top: this.state.deltaPositionOptionBlock.y,
			left: this.state.deltaPositionOptionBlock.x
		};
		return {
			headerPosition,
			buttonsPosition
		};
	}

	createStoryVotingOptions() {
		const allVotes = this.calculateAllVotes();

		return this.props.options.map((el, index) => {
			if (index === 0) {
				return (
					<StoryVotingOption
						allVotesCount={allVotes}
						radius={firstRadius}
						storyVotingOptionInfo={el}
						key={index}
						saveVotingReaction={this.props.saveVotingReaction}
					/>
				);
			} else if (index === this.props.options.length - 1) {
				return (
					<StoryVotingOption
						allVotesCount={allVotes}
						radius={lastRadius}
						storyVotingOptionInfo={el}
						key={index}
						saveVotingReaction={this.props.saveVotingReaction}
					/>
				);
			} else {
				return (
					<StoryVotingOption
						allVotesCount={allVotes}
						storyVotingOptionInfo={el}
						key={index}
						saveVotingReaction={this.props.saveVotingReaction}
					/>
				);
			}
		});
	}

	calculateAllVotes() {
		let count = 0;
		this.props.options.map(option => {
			count +=
				option && option.votingOptionReactions
					? option.votingOptionReactions.length
					: 0;
		});
		return count;
	}

	onSave = () => {
		const { header, userId, image_url, options } = this.props;
		const { deltaPositionHead, deltaPositionOptionBlock } = this.state;
		const rgba =
			typeof this.props.backColor === 'string'
				? this.props.backColor
				: `rgba(${this.props.backColor.r},${this.props.backColor.b},${this.props.backColor.g},${this.props.backColor.a})`;
		const backImage = image_url;
		this.props.createVoting &&
			this.props.createVoting({
				userId,
				header,
				deltaPositionHeadX: deltaPositionHead.x,
				deltaPositionHeadY: deltaPositionHead.y,
				deltaPositionOptionBlockX: deltaPositionOptionBlock.x,
				deltaPositionOptionBlockY: deltaPositionOptionBlock.y,
				backColor: rgba,
				backImage,
				options
			});
	};

	render() {
		const positions = this.calculatePositions();
		const rgba =
			typeof this.props.backColor === 'string'
				? this.props.backColor
				: `rgba(${this.props.backColor.r},${this.props.backColor.b},${this.props.backColor.g},${this.props.backColor.a})`;

		if (this.state.redirect) return <Redirect to={'/create'} />;

		const setRedirect = () => this.setState({ redirect: true });
		const backgroundColor = this.props.backgroundColor;

		return (
			<div className="story-voting-wrp">
				<div
					className="story-voting"
					id="voting-preview"
					style={{
						backgroundColor: backgroundColor,
						backgroundImage: `url(${this.props.backImage ||
							this.props.backgroundImage})`
					}}
				>
					<Draggable
						bounds="parent"
						defaultPosition={{
							x: positions.headerPosition.left,
							y: positions.headerPosition.top
						}}
						onDrag={this.handleDragHead}
						disabled={!this.state.inEditor}
					>
						<div
							className="story-voting-header"
							style={{ color: this.props.fontColor }}
						>
							{this.props.header}
						</div>
					</Draggable>
					<Draggable
						bounds="parent"
						defaultPosition={{
							x: positions.buttonsPosition.left,
							y: positions.buttonsPosition.top
						}}
						onDrag={this.handleDragOptionBlock}
						disabled={!this.state.inEditor}
					>
						<div className="story-voting-options-list">
							{this.createStoryVotingOptions()}
						</div>
					</Draggable>
				</div>
				{this.state.inEditor && (
					<div>
						<button
							className={'btn'}
							onClick={() => {
								this.onSave();
								setRedirect();
							}}
						>
							Save
						</button>
					</div>
				)}
			</div>
		);
	}
}

const mapStateToProps = (rootState, props) => ({
	...props
});

export default connect(mapStateToProps)(StoryVoting);
