import React from 'react';
import './PostStoryEditor.scss';
import ImageUploader from '../ImageUploader/ImageUploader';

// example:
{
	/* <PostStoryEditor id={'1'} type={'story'} uploadImage={event}/> */
}

interface IPostStoryEditorProps {
	id?: string;
	type: 'story' | 'post';
	uploadImage: (s: any) => any;
}

interface IPostStoryEditorState {
	body: string;
	checkboxValue: boolean;
	imageUrl: string;
}

class PostStoryEditor extends React.Component<
	IPostStoryEditorProps,
	IPostStoryEditorState
> {
	constructor(props: IPostStoryEditorProps) {
		super(props);
		this.state = {
			body: '',
			checkboxValue: false,
			imageUrl: ''
		};

		this.onCancel = this.onCancel.bind(this);
		this.onSave = this.onSave.bind(this);
		this.onChangeData = this.onChangeData.bind(this);
		this.onToggleCheckbox = this.onToggleCheckbox.bind(this);
		this.imageStateHandler = this.imageStateHandler.bind(this);
	}

	componentDidMount() {
		if (this.props.id) {
			switch (this.props.type) {
				case 'post':
					// fetch post by id
					this.setState({
						...this.state,
						body: 'test post'
					});
					break;

				case 'story':
					// fetch story by id
					this.setState({
						...this.state,
						body: 'test story'
					});
					break;

				default:
					break;
			}
		}
	}

	onChangeData(e: React.FormEvent<HTMLInputElement>, keyword: string) {
		const target = e.target as HTMLTextAreaElement;
		const value = target.value;
		this.setState({
			...this.state,
			[keyword]: value
		});
	}

	onToggleCheckbox() {
		this.setState({
			...this.state,
			checkboxValue: !this.state.checkboxValue
		});
	}

	onCancel() {
		this.setState({
			...this.state,
			imageUrl: '',
			body: '',
			checkboxValue: false
		});
		console.log('redirected');
		//redirect to main page
	}

	onSave() {
		if (this.state.body.trim() === '') return;
		switch (this.props.type) {
			case 'post':
				this.props.id
					? console.log(this.state, 'post updated') //this.props.updatePost(this.props.id, this.state);
					: console.log(this.state, 'post created'); //this.props.addPost(this.state);
				break;

			case 'story':
				if (this.state.checkboxValue) console.log(this.state, 'post created'); //this.props.addPost(this.state);
				this.props.id
					? console.log(this.state, 'story updated') //this.props.updateStory(this.props.id, this.state);
					: console.log(this.state, 'story created'); //this.props.addStory(this.state);
				break;

			default:
				break;
		}
		this.onCancel();
	}

	imageStateHandler(data) {
		this.setState({
			imageUrl: data
		});
	}

	render() {
		return (
			<div className="edit-form">
				{this.state.imageUrl && <img alt="poster" src={this.state.imageUrl} />}

				<input
					placeholder="Type a text here..."
					type="text"
					value={this.state.body}
					onChange={e => this.onChangeData(e, 'body')}
				/>

				<div className="footer">
					{this.props.type === 'story' && (
						<p className="checker">
							Create post also{' '}
							<input
								type="checkbox"
								checked={this.state.checkboxValue}
								onChange={this.onToggleCheckbox}
							/>
						</p>
					)}
					<div>
						<ImageUploader
							imageHandler={this.props.uploadImage}
							imageStateHandler={this.imageStateHandler}
						/>
						<button className="cancel-btn" onClick={this.onCancel}>
							Cancel
						</button>
						<button className="save-btn" onClick={this.onSave}>
							Save
						</button>
					</div>
				</div>
			</div>
		);
	}
}

export default PostStoryEditor;
