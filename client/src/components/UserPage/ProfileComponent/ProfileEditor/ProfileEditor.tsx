import React, { Component } from 'react';
import './ProfileEditor.scss';

interface IProfileEditorProps {
	user: {
		male: boolean;
		female: boolean;
		name: string;
		location: string;
		aboutMe: string;
	};
	onEditCancel: () => void;
	onEditSave: (any) => void;
}

interface IProfileEditorState {
	gender: boolean;
	name: string;
	location: string;
	aboutMe: string;
}

class ProfileEditor extends Component<
	IProfileEditorProps,
	IProfileEditorState
> {
	constructor(props: IProfileEditorProps) {
		super(props);
		this.state = {
			name: props.user.name,
			gender: props.user.male,
			aboutMe: props.user.aboutMe,
			location: props.user.location
		};
	}

	onGenderChange = e => {
		this.setState({
			gender: e.target.value === 'male'
		});
	};

	onChangeData = (e, keyword: string) => {
		const target = e.target as HTMLInputElement;
		const value = target.value;
		this.setState({
			...this.state,
			[keyword]: value
		});
	};

	onEditCancel = () => {
		this.props.onEditCancel();
	};
	onEditSave = () => {
		this.props.onEditSave(this.state);
	};

	render() {
		const { gender, name, location, aboutMe } = this.state;

		return (
			<div className="profile-editor">
				<div className="profileRow">
					Name:
					<input
						type="text"
						value={name}
						onChange={e => this.onChangeData(e, 'name')}
					/>
				</div>
				<div className="profileRow">
					Gender:
					<div className="editor-gender">
						<label>
							<input
								type="radio"
								value="male"
								checked={gender}
								onChange={this.onGenderChange}
							/>
							Male
						</label>
						<label>
							<input
								type="radio"
								value="female"
								checked={!gender}
								onChange={this.onGenderChange}
							/>
							Female
						</label>
					</div>
				</div>
				<div className="profileRow">
					Location:
					<input
						type="text"
						value={location}
						onChange={e => this.onChangeData(e, 'location')}
					/>
				</div>

				<div className="profileRow">
					About:
					<input
						type="text"
						value={aboutMe}
						onChange={e => this.onChangeData(e, 'aboutMe')}
					/>
				</div>

				<button className="save-btn" onClick={this.onEditSave}>
					Save
				</button>
				<button className="cancel-btn" onClick={this.onEditCancel}>
					Cancel
				</button>
			</div>
		);
	}
}

export default ProfileEditor;
