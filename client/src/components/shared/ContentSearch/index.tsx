import React from 'react';
import './style.scss';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchData } from './redux/actions';

const options = ['all', 'movie', 'event', 'survey', 'top'];
const defaultOption = options[0];

interface IProps {
	fetchData: (title: string, type: string) => any;
}

interface IState {
	title: string;
	type: string;
	showModal: boolean;
}

class ContentSearch extends React.Component<IProps, IState> {
	state = {
		title: '',
		type: defaultOption,
		showModal: true
	};

	componentDidMount(): void {
		document.addEventListener('click', () => {
			this.showModal(false);
		});
	}

	showModal(option: boolean) {
		this.setState({ showModal: option });
	}

	render() {
		const { title, type, showModal } = this.state;

		const { fetchData } = this.props;

		return (
			<div className={'content-search'}>
				<span className="search">
					<input
						type="text"
						placeholder="Search"
						value={title}
						className="search-input"
						onChange={e => this.setState({ title: e.target.value })}
						onKeyPress={e => {
							if (e.which === 13) {
								console.log('send request');
								fetchData(title, type);
							}
						}}
					/>
				</span>
				<select
					className="question-type"
					value={type}
					onChange={event => {
						this.setState({ type: event.target.value });
					}}
				>
					{options.map(option => (
						<option value={option}>{option}</option>
					))}
				</select>
				<div
					className={
						'modal-data-search ' + (showModal ? 'modal-data-search-show' : '')
					}
				>
					<div>something</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (rootState, props) => ({
	...props
});

const actions = {
	fetchData
};

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ContentSearch);
