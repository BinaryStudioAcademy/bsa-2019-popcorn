import React from 'react';
import './StoryVotingOption.scss';

type StoryVotingOptionProps = {
	radius?: string;
	allVotesCount: number;
	storyVotingOptionInfo: {
		body: string;
		votingOptionReactions: any[];
		id?: string;
	};
	saveVotingReaction?: (optionId: string) => any;
};
const calculatePercentage = (voted, allVotesCount) => {
	if (!allVotesCount) {
		return 0;
	}
	return Math.round((voted / allVotesCount) * 100 * 10) / 10;
};

const StoryVotingOption = ({
	storyVotingOptionInfo: { body, votingOptionReactions, id = '' },
	radius,
	allVotesCount,
	saveVotingReaction
}: StoryVotingOptionProps) => {
	const borderStyle = { borderRadius: radius };

	return (
		<div className={'story-voting-option'}>
			<button
				style={borderStyle}
				className="story-voting-option-button"
				onClick={() => saveVotingReaction && saveVotingReaction(id)}
			>
				{body}
			</button>
			<div className={'story-voting-option-percent'}>
				{calculatePercentage(
					votingOptionReactions ? votingOptionReactions.length : 0,
					allVotesCount
				) || 0}
				%
			</div>
		</div>
	);
};

export default StoryVotingOption;
