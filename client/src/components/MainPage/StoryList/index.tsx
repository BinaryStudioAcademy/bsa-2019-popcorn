import StoryList from './story-list/story-list';
import { fetchStories } from './story.redux/actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import GetAddStoryPopupContent from './story-modal/create-story';
import ChooseExtra from './story-modal/choose-extra';
import ChooseExtraOption from './story-modal/choose-extra-option';
import INewStory from './INewStory';

interface IStoryListItem {
	caption: string;
	image_url: string;
	user: {
		avatar: string;
		id: string;
		name: string;
		any;
	};
	any;
}

interface IProps {
	scrollStep: number;
	stories: null | Array<IStoryListItem>;
	fetchStories: () => any;
	avatar: null | string;
	newStory: INewStory;
}

const ListBlock = ({ ...props }: IProps) => {
	return (
		<div>
			<StoryList {...props} />
			<Switch>
				<Route
					exact
					path={`/create`}
					component={() => (
						<GetAddStoryPopupContent newStory={props.newStory} />
					)}
				/>
				<Route exact path={`/create/extra`} component={ChooseExtra} />
				<Route path={`/create/extra/:option`} component={ChooseExtraOption} />
			</Switch>
		</div>
	);
};

const mapStateToProps = (rootState, props) => ({
	...props,
	stories: rootState.story.stories,
	avatar: rootState.profile.profileInfo && rootState.profile.profileInfo.avatar,
	newStory: rootState.story.newStory
});

const actions = {
	fetchStories
};
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ListBlock);
