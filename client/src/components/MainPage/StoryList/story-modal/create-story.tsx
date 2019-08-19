import React from 'react';
import { Redirect } from 'react-router';
import PostStoryEditor from '../../PostStoryEditor/PostStoryEditor';
import INewStory from '../INewStory';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface IProps {
	newStory: INewStory;
	cursorPosition: { start: number; end: number };
	setCaption: (caption: string, start: number, end: number) => any;
	saveImage: (url: string) => any;
	changeActivity: (
		type: string,
		activity: { id: string; name: string } | null
	) => any;
	createStory: (newStory: INewStory, userId: string) => any;
	userId: string;
	history: {
		push: (path: string) => void;
	};
}

class getAddStoryPopupContent extends React.Component<IProps> {
	state = {
		open: true,
		extra: true
	};

	static valid({ image_url, caption, type }: INewStory) {
		return (image_url && caption) || type === 'voting';
	}

	render() {
		const newStory = this.props.newStory;

		const disabled = !getAddStoryPopupContent.valid(newStory);

		if (!this.state.open) return <Redirect to={'/'} />;
		if (!this.state.extra) return <Redirect to={'/create/extra'} />;

		const close = () => this.setState({ open: false });

		const addExtra = () => this.setState({ extra: false });

		return (
			<div className={'modal-wrp'}>
				<div className={'modal modal-story'}>
					<div className={'content-wrp'}>
						<PostStoryEditor
							type={'story'}
							body={newStory.caption || ''}
							cursorPosition={this.props.cursorPosition}
							imageUrl={newStory.image_url || ''}
							changeBody={this.props.setCaption}
							saveImage={this.props.saveImage}
							changeActivity={this.props.changeActivity}
						>
							{newStory.activity && newStory.activity.name}
						</PostStoryEditor>
						<button
							className={'btn'}
							onClick={addExtra}
							style={{
								width: '50px',
								minWidth: 'auto',
								position: 'absolute',
								top: '5px',
								right: '65px',
								height: '43px',
								display: 'flex',
								justifyContent: 'center'
							}}
						>
							<FontAwesomeIcon icon={faPlusCircle} />
						</button>
					</div>

					<div className={'btn-wrp'}>
						<div className={'cancel-save'}>
							<button onClick={close} className={'btn'}>
								Cancel
							</button>
							<button
								className={'btn'}
								disabled={disabled}
								onClick={() => {
									this.props.createStory(newStory, this.props.userId);
									this.props.history.push('/');
								}}
							>
								Save
							</button>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default getAddStoryPopupContent;
