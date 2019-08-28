import React from 'react';
import { Redirect } from 'react-router';
import PostStoryEditor from '../../PostStoryEditor/PostStoryEditor';
import INewStory from '../INewStory';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TMovie from '../../../MovieSeriesPage/TMovie';
import Spinner from '../../../shared/Spinner';
import { SketchPicker } from 'react-color';
import { setBackground, displayPicker } from '../story.redux/actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

interface IProps {
	newStory: INewStory;
	cursorPosition: { start: number; end: number };
	setCaption: (
		caption: string,
		start: number,
		end: number,
		title: string
	) => any;
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
	movies: null | Array<TMovie>;
	fetchSearch: (title: string) => any;
	title: string;
	resetSearch: () => any;
	saveMovie: (movie: TMovie) => any;
	isLoading: boolean;
	photoSaved: boolean;
	saveAfterCrop: () => void;
	setBackground: (color: string) => void;
	backgroundColor: string;
	displayPicker: (isShown: boolean) => void;
	displayColorPicker: boolean;
}

class getAddStoryPopupContent extends React.Component<IProps> {
	state = {
		open: true,
		extra: true
	};

	static valid({ image_url, backgroundColor, caption, type }: INewStory) {
		return caption || type === 'voting';
	}

	handleHideColorPicker = () => {
		this.props.displayPicker(false);
	};

	handleColorChange = color => {
		this.props.setBackground(
			`rgba(${color.rgb.r},${color.rgb.g},${color.rgb.b},${color.rgb.a})`
		);
	};
	handleShowColorPicker = () => {
		this.props.displayPicker(!this.props.displayColorPicker);
	};

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
							movies={this.props.movies}
							fetchSearch={this.props.fetchSearch}
							title={this.props.title}
							resetSearch={this.props.resetSearch}
							saveMovie={this.props.saveMovie}
							photoSaved={this.props.photoSaved}
							saveAfterCrop={this.props.saveAfterCrop}
							backgroundColor={this.props.backgroundColor}
						>
							{newStory.activity && newStory.activity.name}
						</PostStoryEditor>
						<div
							onClick={this.handleShowColorPicker}
							className="color-picker-btn"
						>
							<div
								style={{ backgroundColor: this.props.backgroundColor }}
								className="color-picker-btn-preview"
							/>
						</div>
						{this.props.displayColorPicker ? (
							<div className="color-picker-popover">
								<div
									className="color-picker-cover"
									onClick={this.handleHideColorPicker}
								/>
								<SketchPicker
									color={this.props.backgroundColor}
									onChangeComplete={this.handleColorChange}
								/>
							</div>
						) : null}
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
									this.props.createStory(
										{
											...newStory,
											backgroundColor: this.props.backgroundColor
										},
										this.props.userId
									);
									this.props.history.push('/');
								}}
							>
								Save
							</button>
						</div>
					</div>
					{this.props.isLoading && <Spinner />}
				</div>
			</div>
		);
	}
}

const mapStateToProps = (rootState, props) => ({
	...props,
	backgroundColor: rootState.story.newStory.backgroundColor,
	displayColorPicker: rootState.story.isShownPicker
});

const actions = {
	setBackground,
	displayPicker
};

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(getAddStoryPopupContent);
