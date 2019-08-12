import StoryList from './story-list/story-list';
import { fetchStories } from './story.redux/actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const mapStateToProps = (rootState, props) => ({
	...props,
	stories: rootState.story.stories,
	avatar: rootState.profile.profileInfo && rootState.profile.profileInfo.avatar
});

const actions = {
	fetchStories
};
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(StoryList);
