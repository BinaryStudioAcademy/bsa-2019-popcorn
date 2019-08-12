import React from 'react';
import { ReactComponent as CrossIcon } from '../../assets/icons/storyVote/crossIcon.svg';
import { SketchPicker } from 'react-color';
import StoryVoting from '../StoryVoting/StoryVoting';
import './StoryVotingCreation.scss';

type StoryVotingCreationState = {
	header: string;
	inputs: Array<{ text: string; voted: 0 }>;
	previewIsShown: boolean;
	deltaPositionHeader: { x: number; y: number };
	deltaPositionOptionBlock: { x: number; y: number };
	imageUrl?: string;
	errorMsg?: string;
	isUploading: boolean;
	displayColorPicker: boolean;
	backgroundColor: {
		r: string;
		g: string;
		b: string;
		a: string;
	};
};

class StoryVotingCreation extends React.Component<
	{ uploadImage: (data: any) => any },
	StoryVotingCreationState
> {
	constructor(props) {
		super(props);
		this.state = {
			header: '',
			inputs: [{ text: '', voted: 0 }, { text: '', voted: 0 }],
			previewIsShown: false,
			deltaPositionHeader: {
				x: 0,
				y: 0
			},
			deltaPositionOptionBlock: {
				x: 0,
				y: 0
			},
			imageUrl: undefined,
			errorMsg: '',
			isUploading: false,
			displayColorPicker: false,
			backgroundColor: {
				r: '0',
				g: '0',
				b: '0',
				a: '1'
			}
		};
		this.handleInputTextChange = this.handleInputTextChange.bind(this);
		this.handleRemoveInput = this.handleRemoveInput.bind(this);
		this.handleAddOption = this.handleAddOption.bind(this);
		this.handleShowPreview = this.handleShowPreview.bind(this);
		this.handleHeaderInputChange = this.handleHeaderInputChange.bind(this);
		this.handleShowEditor = this.handleShowEditor.bind(this);
		this.handleUploadFile = this.handleUploadFile.bind(this);
		this.handleColorChange = this.handleColorChange.bind(this);
		this.handleShowColorPicker = this.handleShowColorPicker.bind(this);
		this.handleHideColorPicker = this.handleHideColorPicker.bind(this);
		this.createInputs = this.createInputs.bind(this);
	}

	handleShowPreview = () => {
		if (
			this.state.inputs.filter(el => el.text == '').length === 0 &&
			this.state.header !== ''
		)
			this.setState({
				...this.state,
				previewIsShown: !this.state.previewIsShown
			});
		else
			this.setState({
				...this.state,
				errorMsg: 'All inputs should be filled'
			});
	};

	handleColorChange = color => {
		this.setState({
			...this.state,
			backgroundColor: color.rgb
		});
	};

	handleShowColorPicker = () => {
		this.setState({
			...this.state,
			displayColorPicker: !this.state.displayColorPicker
		});
	};

	handleHideColorPicker = () => {
		this.setState({
			...this.state,
			displayColorPicker: false
		});
	};

	handleShowEditor = (deltaHead, deltaOption) => {
		this.setState({
			...this.state,
			deltaPositionHeader: {
				x: deltaHead.x,
				y: deltaHead.y
			},
			deltaPositionOptionBlock: {
				x: deltaOption.x,
				y: deltaOption.y
			},
			previewIsShown: !this.state.previewIsShown
		});
	};

	handleInputTextChange = idx => evt => {
		const newInputs = this.state.inputs.map((el, sidx) => {
			if (idx !== sidx) return el;
			return { ...el, text: evt.target.value };
		});
		this.setState({ inputs: newInputs });
	};

	handleRemoveInput = idx => () => {
		this.setState({
			inputs: this.state.inputs.filter((el, sidx) => idx !== sidx)
		});
	};

	handleAddOption = () => {
		if (this.state.inputs.length < 5)
			this.setState({
				inputs: this.state.inputs.concat([{ text: '', voted: 0 }])
			});
	};

	handleHeaderInputChange = e => {
		this.setState({
			...this.state,
			header: e.target.value
		});
	};

	handleUploadFile({ target }) {
		this.setState({ isUploading: true, errorMsg: '' });

		if (target.files[0] && target.files[0].size > 1048576 * 3) {
			target.value = '';
			this.setState({
				isUploading: false,
				errorMsg: 'File is too big! (max 3MB)'
			});
			return;
		}

		const data = new FormData();
		data.append('file', target.files[0]);
		this.props
			.uploadImage(data)
			.then(({ imageUrl }) => {
				this.setState({ imageUrl, isUploading: false, errorMsg: '' });
			})
			.catch(error => {
				this.setState({ isUploading: false, errorMsg: error.message });
			});
		target.value = '';
	}

	handleSaveClick = () => {};

	handleCancelClick = () => {};

	createInputs = () => {
		const inputs = this.state.inputs.map((el, idx) => (
			<div className="story-voting-option-with-button">
				<input
					className="story-voting-option-input"
					type="text"
					style={{
						outline: this.state.errorMsg === '' ? 'none' : '1px solid red'
					}}
					placeholder={`Option ${idx + 1} `}
					value={el.text}
					onChange={this.handleInputTextChange(idx)}
				/>
				{idx > 1 ? (
					<button
						type="button"
						onClick={this.handleRemoveInput(idx)}
						className="delete-input-button"
					>
						<CrossIcon />
					</button>
				) : null}
			</div>
		));
		return inputs;
	};

	render() {
		const styles = {
			errorsStyle: {
				outline: this.state.errorMsg === '' ? 'none' : '1px solid red'
			},
			backStyle: {
				background: `rgba(${this.state.backgroundColor.r},${this.state.backgroundColor.g},${this.state.backgroundColor.b},${this.state.backgroundColor.a})`
			}
		};
		return this.state.previewIsShown ? (
			<StoryVoting
				backColor={this.state.backgroundColor}
				backImage={this.state.imageUrl}
				deltaPositionForOptionBlock={this.state.deltaPositionOptionBlock}
				deltaPositionForHeader={this.state.deltaPositionHeader}
				backToEditor={this.handleShowEditor}
				header={this.state.header}
				options={this.state.inputs}
			/>
		) : (
			<div className="story-voting-creation-form">
				<div className="head">
					<img
						className="author"
						src="https://pbs.twimg.com/profile_images/1088129693390385152/oYJSGsdq_400x400.jpg"
					></img>
					<input
						className="story-voting-header-input"
						style={styles.errorsStyle}
						type="text"
						placeholder={'Ask a question...'}
						value={this.state.header}
						onChange={this.handleHeaderInputChange}
					></input>
				</div>
				<div className="story-voting-option-input-container">
					{this.createInputs()}
				</div>
				<button
					className="add-option-button"
					type="button"
					onClick={this.handleAddOption}
				>
					Add Option
				</button>
				<div className="color-picker">
					<label className="color-picker-label">Select back color:</label>
					<div
						onClick={this.handleShowColorPicker}
						className="color-picker-btn"
					>
						<div
							style={styles.backStyle}
							className="color-picker-btn-preview"
						></div>
					</div>
					{this.state.displayColorPicker ? (
						<div className="color-picker-popover">
							<div
								className="color-picker-cover"
								onClick={this.handleHideColorPicker}
							/>
							<SketchPicker
								color={this.state.backgroundColor}
								onChange={this.handleColorChange}
							/>
						</div>
					) : null}
				</div>
				<div className="image-uploading">
					<label htmlFor="image" className="upload-image-button">
						Upload image? :
					</label>
					<input
						name="image"
						type="file"
						onChange={this.handleUploadFile}
						className="upload-image"
						id="image"
						accept=".jpg, .jpeg, .png"
						disabled={this.state.isUploading}
					/>
				</div>
				<div className="errors-field">{this.state.errorMsg}</div>
				<button
					type="button"
					className="show-voting-preview-button"
					onClick={this.handleShowPreview}
				>
					Show Preview
				</button>
				<div className="form-action-buttons">
					<button className="cancel-btn-vote-creation">Cancel</button>
					<button className="save-btn-vote-creation">Save</button>
				</div>
			</div>
		);
	}
}

export default StoryVotingCreation;
