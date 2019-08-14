import StoryVotingCreation from '../../../StoryVotingCreation/StoryVotingCreation';
import * as React from 'react';

class CreateVote extends React.Component {
	render() {
		return (
			<div className={'modal modal-story'}>
				<StoryVotingCreation />
			</div>
		);
	}
}

export default CreateVote;
