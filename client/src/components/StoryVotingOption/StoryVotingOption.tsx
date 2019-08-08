import React from "react";
import './StoryVotingOption.scss';

type StoryVotingOptionProps = {
    radius?: string,
    allVotesCount: number,
    storyVotingOptionInfo: {
        text: string,
        voted: number
    }
}

const StoryVotingOption = ({ storyVotingOptionInfo: { text, voted }, radius, allVotesCount }: StoryVotingOptionProps) => {
    return <div className='story-voting-option'>
        <button style={{ borderRadius: radius }} className='story-voting-option-button'>
            {text}
        </button>
        <div className='story-voting-option-percent'>{Math.round((voted/allVotesCount*100)*10)/10}%</div>
    </div>
}

export default StoryVotingOption;