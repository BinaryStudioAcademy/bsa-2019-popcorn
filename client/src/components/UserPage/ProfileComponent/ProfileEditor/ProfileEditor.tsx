import React, { Component } from 'react';
import './ProfileEditor.scss';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';

interface IProfileEditorProps {
	user: {
		male: boolean;
		female: boolean;
		name: string;
		location: string;
		aboutMe: string;
		favoriteLists: Array<{ movie: { id: number; name: string } }>;
	};
	onEditCancel: () => void;
	onEditSave: (any) => void;
}

interface IProfileEditorState {
	gender: boolean;
	name: string;
	location: string;
	aboutMe: string;
	favoriteMovies: Array<{ id: number; name: string }>;
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
			location: props.user.location,
			favoriteMovies: props.user.favoriteLists.map(item => item.movie)
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

	onDeleteFavoriteMovie = (e, id) => {
		e.preventDefault();
		const newMovies = this.state.favoriteMovies.filter(
			movie => movie.id !== id
		);
		this.setState({ favoriteMovies: newMovies });
	};

	onAddFavoriteMovie = (e, newMovie) => {
		e.preventDefault();
		const newMovies = [...this.state.favoriteMovies, newMovie];
		this.setState({ favoriteMovies: newMovies });
	};

	render() {
		const { gender, name, location, aboutMe, favoriteMovies } = this.state;

		return (
			<div className="profile-editor">
				<div className="profileRow">
					<p className="field">Name:</p>
					<input
						type="text"
						value={name}
						onChange={e => this.onChangeData(e, 'name')}
					/>
				</div>
				<div className="profileRow">
					<p className="field">Gender:</p>
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
					<p className="field">Location:</p>
					<input
						type="text"
						value={location}
						onChange={e => this.onChangeData(e, 'location')}
					/>
				</div>
				<div className="profileRow">
					<p className="field">About:</p>
					<input
						type="text"
						value={aboutMe}
						onChange={e => this.onChangeData(e, 'aboutMe')}
					/>
				</div>
				<div className="profileRow">
					<p className="field">Favorite movies:</p>
					<div className="content">
						{favoriteMovies.map(item => {
							return (
								item && (
									<NavLink key={item.id} to={'/movies/' + item.id}>
										<p>
											{item.name}
											<button
												className="delete-movie"
												onClick={e => this.onDeleteFavoriteMovie(e, item.id)}
											>
												<FontAwesomeIcon
													className="icon"
													icon={faTimesCircle}
												/>
											</button>
										</p>
									</NavLink>
								)
							);
						})}
					</div>
				</div>

				<button className="btn save-btn" onClick={this.onEditSave}>
					Save
				</button>
				<button className="btn cancel-btn" onClick={this.onEditCancel}>
					Cancel
				</button>
			</div>
		);
	}
}

export default ProfileEditor;
