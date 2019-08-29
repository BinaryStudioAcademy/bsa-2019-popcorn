import React from 'react';
import { Redirect } from 'react-router';
import PostStoryEditor from '../../PostStoryEditor/PostStoryEditor';
import INewStory from '../INewStory';
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TMovie from '../../../MovieSeriesPage/TMovie';
import Spinner from '../../../shared/Spinner';
import { SketchPicker } from 'react-color';
import {
	setBackground,
	displayPicker,
	setFontColor,
	displayFontPicker,
	displayInput
} from '../story.redux/actions';
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
	setFontColor: (color: string) => void;
	fontColor: string;
	displayPicker: (isShown: boolean) => void;
	isShownPicker: boolean;
	displayFontPicker: (isShown: boolean) => void;
	isShownFontPicker: boolean;
	displayInput: (isShown: boolean) => void;
	isShownInput: boolean;
}

class getAddStoryPopupContent extends React.Component<IProps> {
	state = {
		open: true,
		extra: true
	};

	static valid({ image_url, backgroundColor, caption, type }: INewStory) {
		return caption || type === 'voting';
	}

	//background picker
	handleHideColorPicker = () => {
		this.props.displayPicker(false);
	};

	handleColorChange = color => {
		this.props.setBackground(
			`rgba(${color.rgb.r},${color.rgb.g},${color.rgb.b},${color.rgb.a})`
		);
	};
	handleShowColorPicker = () => {
		this.props.displayPicker(!this.props.isShownPicker);
	};

	//font color picker
	handleHideFontPicker = () => {
		this.props.displayFontPicker(false);
	};

	handleFontChange = color => {
		this.props.setFontColor(
			`rgba(${color.rgb.r},${color.rgb.g},${color.rgb.b},${color.rgb.a})`
		);
	};
	handleShowFontPicker = () => {
		this.props.displayFontPicker(!this.props.isShownFontPicker);
	};

	toggleInput = () => {
		this.props.displayInput(!this.props.isShownInput);
		if (this.props.isShownInput) this.props.setCaption('', 0, 0, '');
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
							isShownInput={this.props.isShownInput}
							fontColor={this.props.fontColor}
						>
							{newStory.activity && newStory.activity.name}
						</PostStoryEditor>

						<div className="story-editor-btns">
							<div
								onClick={this.handleShowColorPicker}
								className="color-picker-btn"
							>
								<div
									style={{ backgroundColor: this.props.backgroundColor }}
									className="color-picker-btn-preview"
								/>
							</div>
							{this.props.isShownPicker ? (
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

							<button onClick={this.toggleInput}>T</button>
							<div
								onClick={this.handleShowFontPicker}
								className="color-picker-btn"
							>
								<div
									style={{ color: this.props.fontColor }}
									className="color-picker-btn-preview text-preview"
								>
									T
								</div>
							</div>
							{this.props.isShownFontPicker ? (
								<div className="color-picker-popover">
									<div
										className="color-picker-cover"
										onClick={this.handleHideFontPicker}
									/>
									<SketchPicker
										className="font-picker"
										color={this.props.fontColor}
										onChangeComplete={this.handleFontChange}
									/>
								</div>
							) : null}
							<div className="color-picker-btn"></div>
							<button onClick={addExtra}>
								<FontAwesomeIcon icon={faPlus} />
							</button>
						</div>
					</div>

					<button onClick={close} className="cancel-btn">
						<FontAwesomeIcon icon={faTimes} />
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
						Share
					</button>
					{this.props.isLoading && <Spinner />}
				</div>
			</div>
		);
	}
}

const mapStateToProps = (rootState, props) => ({
	...props,
	backgroundColor: rootState.story.newStory.backgroundColor,
	isShownPicker: rootState.story.isShownPicker,
	fontColor: rootState.story.newStory.fontColor,
	isShownFontPicker: rootState.story.isShownFontPicker,
	isShownInput: rootState.story.isShownInput
});

const actions = {
	setBackground,
	displayPicker,
	setFontColor,
	displayFontPicker,
	displayInput
};

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(getAddStoryPopupContent);
