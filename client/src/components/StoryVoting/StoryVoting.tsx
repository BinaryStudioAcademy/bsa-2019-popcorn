import React from "react";
import StoryVotingOption from '../StoryVotingOption/StoryVotingOption';
import { ReactComponent as CrossIcon } from '../../assets/icons/storyVote/crossIcon.svg';
import './StoryVoting.scss';
import Draggable from 'react-draggable';

type StoryVotingProps = {
    header: string,
    options: Array<{
        text: string,
        voted: number
    }>,
    deltaPositionForHeader: {
        x: number,
        y: number
    }
    deltaPositionForOptionBlock: {
        x: number,
        y: number
    }
    backToEditor: (deltaHead: { x: number, y: number }, deltaOptions: { x: number, y: number }) => void,
    backColor:{ r:string, g:string, b:string, a:string},
    backImage?: string
}

type StoryVotingState = {
    answerSelected: boolean, inEditor: boolean,
    deltaPositionHead: { x: number, y: number },
    deltaPositionOptionBlock: { x: number, y: number }
}

const firstRadius = '28px 0 0 28px';

const lastRadius = '0 28px 28px 0';


const storyVotingOptionsMock = [{ text: 'Yes', voted: 5 }, { text: 'No', voted: 6 }, { text: 'Maybe', voted: 10 }];

class StoryVoting extends React.Component<StoryVotingProps, StoryVotingState>{
    constructor(props) {
        super(props)
        this.state = {
            answerSelected: false,
            inEditor: true,
            deltaPositionHead: {
                x: this.props.deltaPositionForHeader.x, y: this.props.deltaPositionForHeader.y
            },
            deltaPositionOptionBlock: {
                x: this.props.deltaPositionForOptionBlock.x, y: this.props.deltaPositionForOptionBlock.y
            }
        }
        this.onAnswerSelect = this.onAnswerSelect.bind(this);
        this.handleDragHead = this.handleDragHead.bind(this);
        this.handleDragOptionBlock = this.handleDragOptionBlock.bind(this)
    }

    onAnswerSelect() {
    }

    handleDragHead(e, ui) {
        const { x, y } = this.state.deltaPositionHead;
        this.setState({
            ...this.state,
            deltaPositionHead: {
                x: x + ui.deltaX,
                y: y + ui.deltaY,
            }

        });
    }

    handleDragOptionBlock(e, ui) {
        const { x, y } = this.state.deltaPositionOptionBlock;
        this.setState({
            ...this.state,
            deltaPositionOptionBlock: {
                x: x + ui.deltaX,
                y: y + ui.deltaY,
            }

        });
    }

    render() {
        const allVotes = storyVotingOptionsMock.reduce((a, b) => a + (b['voted'] || 0), 0);
        const headerPosition = { top: 0 + this.state.deltaPositionHead.y, left: 0 + this.state.deltaPositionHead.x }
        const buttonsPosition = { top: 0 + this.state.deltaPositionOptionBlock.y, left: 0 + this.state.deltaPositionOptionBlock.x }
        console.log(headerPosition)
        return <div className='story-voting' style={{background:this.props.backImage?`url(${this.props.backImage})`:`rgba(${this.props.backColor.r},${this.props.backColor.b},${this.props.backColor.g},${this.props.backColor.a})`}}>
            <button onClick={() => this.props.backToEditor(this.state.deltaPositionHead, this.state.deltaPositionOptionBlock)} className='back-to-editor-button'><CrossIcon width="3em" height="3em" /></button>
            <Draggable bounds=".story-voting" defaultPosition={{ x: headerPosition.left, y: headerPosition.top }} onDrag={this.handleDragHead} disabled={this.state.inEditor ? false : true} ><div className='story-voting-header'>{this.props.header}</div></Draggable>
            <Draggable bounds=".story-voting" defaultPosition={{ x: buttonsPosition.left, y: buttonsPosition.top }} onDrag={this.handleDragOptionBlock} disabled={this.state.inEditor ? false : true}>
                <div className='story-voting-options-list'>
                    {this.props.options.map((el, index) => {
                        if (index === 0)
                            return <StoryVotingOption allVotesCount={allVotes} radius={firstRadius} storyVotingOptionInfo={el} key={index} />
                        else if (index === this.props.options.length - 1)
                            return <StoryVotingOption allVotesCount={allVotes} radius={lastRadius} storyVotingOptionInfo={el} key={index} />
                        else
                            return <StoryVotingOption allVotesCount={allVotes} storyVotingOptionInfo={el} key={index} />
                    })}
                </div>
            </Draggable>
        </div>
    }
}

export default StoryVoting;