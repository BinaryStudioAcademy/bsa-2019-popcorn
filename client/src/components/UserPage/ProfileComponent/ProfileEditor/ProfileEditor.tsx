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
		const { onEditCancel } = this.props;

		return (
			<div className="profile-editor">
				<div>
					Name:
					<input
						type="text"
						value={name}
						onChange={e => this.onChangeData(e, 'name')}
					/>
				</div>

				<div className="radio">
					<label>
						<input
							type="radio"
							value="male"
							checked={gender}
							onChange={this.onGenderChange}
						/>
						Male
					</label>
				</div>
				<div className="radio">
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

				<div>
					Location:
					<input
						type="text"
						value={location}
						onChange={e => this.onChangeData(e, 'location')}
					/>
				</div>

				<div>
					About:
					<input
						type="text"
						value={aboutMe}
						onChange={e => this.onChangeData(e, 'aboutMe')}
					/>
				</div>

				<button onClick={this.onEditCancel}>Cancel</button>
				<button onClick={this.onEditSave}>Save</button>
			</div>
		);
	}
}

export default ProfileEditor;
