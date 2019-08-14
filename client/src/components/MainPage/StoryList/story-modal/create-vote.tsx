import StoryVotingCreation from '../../../StoryVotingCreation/StoryVotingCreation';
import * as React from 'react';
import IVoting from '../IVoting';
import INewStory from '../INewStory';

interface IProps {
	userId: string;
	createVoting: (voting: IVoting) => any;
}
export default class CreateVoting extends React.Component<IProps> {
	render() {
		return (
			<div className={'modal modal-story'}>
				<StoryVotingCreation
					createVoting={this.props.createVoting}
					userId={this.props.userId}
				/>
			</div>
		);
	}
}
