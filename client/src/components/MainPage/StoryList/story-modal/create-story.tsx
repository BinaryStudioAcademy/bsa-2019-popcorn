import React from 'react';
import { Redirect } from 'react-router';
import PostStoryEditor from '../../PostStoryEditor/PostStoryEditor';
import INewStory from '../INewStory';

interface IProps {
	newStory: INewStory;
	setCaption: (caption: string) => any;
}

class getAddStoryPopupContent extends React.Component<IProps> {
	state = {
		open: true,
		extra: true
	};

	render() {
		const newStory = this.props.newStory;

		if (!this.state.open) return <Redirect to={'/'} />;
		if (!this.state.extra) return <Redirect to={'/create/extra'} />;

		const close = () => this.setState({ open: false });

		const addExtra = () => this.setState({ extra: false });

		return (
			<div className={'modal modal-story'}>
				<div className={'content-wrp'}>
					<PostStoryEditor
						type={'story'}
						addExtra={addExtra}
						body={newStory.caption || ''}
						imageUrl={newStory.image_url}
						changeBody={this.props.setCaption}
					/>
				</div>

				<div className={'btn-wrp'}>
					<button onClick={close} className={'btn'}>
						Cancel
					</button>
					<button className={'btn'}>Save</button>
				</div>
			</div>
		);
	}
}

export default getAddStoryPopupContent;
