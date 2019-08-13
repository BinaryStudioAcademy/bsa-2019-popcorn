import React from 'react';
import './UserTops.scss';
import DragDrop from './DragDrop';

let moviess = [
	{ title: 'Big Beauty reunion', id: 123 },
	{ title: 'THE BIG LEBOWSKI', id: 456 }
];

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex): any => {
	const result = Array.from(list);
	const [removed] = result.splice(startIndex, 1);
	result.splice(endIndex, 0, removed);

	return result;
};

interface IUserTopsProps {
	location?: {
		state?: {
			url_callback?: string;
		};
	};
	history?: {
		push: (path: string) => any;
	};
}

interface IMovie {
	inputMovies: Array<any>;
}

class UserTops extends React.Component<IUserTopsProps, IMovie> {
	constructor(props) {
		super(props);
		this.state = {
			inputMovies: moviess
		};
		this.onDragEnd = this.onDragEnd.bind(this);
	}

	onDragEnd(result) {
		if (!result.destination) {
			return;
		}
		const updatedItems = reorder(
			this.state.inputMovies,
			result.source.index,
			result.destination.index
		);
		this.setState({ inputMovies: updatedItems });
	}

	deleteFilmInput = (movieId: number) => {
		const inputMovies = this.state.inputMovies.filter(
			movie => movie.id !== movieId
		);

		this.setState({ inputMovies });
	};

	render() {
		const { inputMovies } = this.state;

		const url_callback =
			this.props.location &&
			this.props.location.state &&
			this.props.location.state.url_callback;
		const redirect = () =>
			url_callback
				? this.props.history && this.props.history.push(url_callback)
				: null;

		return (
			<div className="user-tops">
				{url_callback && (
					<button onClick={redirect} className={'btn'}>
						Back to story
					</button>
				)}
				<DragDrop
					deleteFilmInput={this.deleteFilmInput}
					inputMovies={inputMovies}
					onDragEnd={this.onDragEnd}
				/>
				<div
					className="add-film"
					onClick={() =>
						this.setState({
							inputMovies: [
								...this.state.inputMovies,
								{ title: '', id: Date.now() }
							]
						})
					}
				>
					Add film
				</div>
			</div>
		);
	}
}

export default UserTops;
