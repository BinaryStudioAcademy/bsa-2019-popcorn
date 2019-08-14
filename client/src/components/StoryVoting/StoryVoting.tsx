import React from 'react';
import StoryVotingOption from '../StoryVotingOption/StoryVotingOption';
import './StoryVoting.scss';
import Draggable from 'react-draggable';
import IVoting from '../MainPage/StoryList/IVoting';
import { Redirect } from 'react-router';

type StoryVotingProps = {
	header: string;
	options: Array<{
		text: string;
		voted: number;
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
	backColor: { r: string; g: string; b: string; a: string };
	backImage?: string;
	userId: string;
	createVoting?: (voting: IVoting) => any;
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

const storyVotingOptionsMock = [
	{ text: 'Yes', voted: 5 },
	{ text: 'No', voted: 6 },
	{ text: 'Maybe', voted: 10 }
];

class StoryVoting extends React.Component<StoryVotingProps, StoryVotingState> {
	constructor(props) {
		super(props);
		this.state = {
			answerSelected: false,
			inEditor: props.inEditor || true,
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
		const allVotes = StoryVoting.calculateAllVotes();
		return this.props.options.map((el, index) => {
			if (index === 0)
				return (
					<StoryVotingOption
						allVotesCount={allVotes}
						radius={firstRadius}
						storyVotingOptionInfo={el}
						key={index}
					/>
				);
			else if (index === this.props.options.length - 1)
				return (
					<StoryVotingOption
						allVotesCount={allVotes}
						radius={lastRadius}
						storyVotingOptionInfo={el}
						key={index}
					/>
				);
			else
				return (
					<StoryVotingOption
						allVotesCount={allVotes}
						storyVotingOptionInfo={el}
						key={index}
					/>
				);
		});
	}

	static calculateAllVotes() {
		return storyVotingOptionsMock.reduce((a, b) => a + (b['voted'] || 0), 0);
	}

	onSave = () => {
		const { header, userId, backColor, backImage } = this.props;
		const { deltaPositionHead, deltaPositionOptionBlock } = this.state;
		this.props.createVoting &&
			this.props.createVoting({
				userId,
				header,
				deltaPositionHeadX: deltaPositionHead.x,
				deltaPositionHeadY: deltaPositionHead.y,
				deltaPositionOptionBlockX: deltaPositionOptionBlock.x,
				deltaPositionOptionBlockY: deltaPositionOptionBlock.y,
				backColor: `rgba(${backColor.r},${backColor.g},${backColor.b},${backColor.a})`,
				backImage: backImage
			});
	};

	render() {
		const positions = this.calculatePositions();
		const backgroundStyle = {
			background: this.props.backImage
				? `url(${this.props.backImage})`
				: `rgba(${this.props.backColor.r},${this.props.backColor.b},${this.props.backColor.g},${this.props.backColor.a})`
		};

		if (this.state.redirect) return <Redirect to={'/create'} />;

		const setRedirect = () => this.setState({ redirect: true });

		return (
			<div>
				<div className="story-voting" style={backgroundStyle}>
					<button
						onClick={() =>
							this.props.backToEditor &&
							this.props.backToEditor(
								this.state.deltaPositionHead,
								this.state.deltaPositionOptionBlock
							)
						}
						className="back-to-editor-button"
					/>
					<Draggable
						bounds=".story-voting"
						defaultPosition={{
							x: positions.headerPosition.left,
							y: positions.headerPosition.top
						}}
						onDrag={this.handleDragHead}
						disabled={this.state.inEditor ? false : true}
					>
						<div className="story-voting-header">{this.props.header}</div>
					</Draggable>
					<Draggable
						bounds=".story-voting"
						defaultPosition={{
							x: positions.buttonsPosition.left,
							y: positions.buttonsPosition.top
						}}
						onDrag={this.handleDragOptionBlock}
						disabled={this.state.inEditor ? false : true}
					>
						<div className="story-voting-options-list">
							{this.createStoryVotingOptions()}
						</div>
					</Draggable>
				</div>
				{this.state.inEditor && (
					<div className={'btn-wrp'}>
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
export default StoryVoting;
