import React from 'react';
import './style.scss';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const options = ['movie', 'event', 'survey', 'top'];
const defaultOption = options[0];

interface IState {
	value: string;
	option: string;
}

class ContentSearch extends React.Component<{}, IState> {
	state = {
		value: '',
		option: defaultOption
	};

	render() {
		const { value, option } = this.state;

		return (
			<div className={'content-search'}>
				<span className="search">
					<input
						type="text"
						placeholder="Search"
						value={value}
						className="search-input"
						onChange={e => this.setState({ value: e.target.value })}
						onKeyPress={e => {
							if (e.which === 13) console.log('send request');
						}}
					/>
				</span>
				<select
					className="question-type"
					value={option}
					onChange={event => {
						this.setState({ option: event.target.value });
					}}
				>
					{options.map(option => (
						<option value={option}>{option}</option>
					))}
				</select>
			</div>
		);
	}
}

const mapStateToProps = (rootState, props) => ({
	...props
});

const actions = {};

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ContentSearch);
