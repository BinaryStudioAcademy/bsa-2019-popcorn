import React from 'react';
import './style.scss';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchData } from './redux/actions';
import { Redirect } from 'react-router-dom';
import ResultList from './ResultList';
import { ReactComponent as SearchIcon } from '../../../assets/icons/general/search-icon.dbb24f09.svg';
const options = [
	'all',
	'movie',
	'event',
	'survey',
	'top',
	'user',
	'advance movie search   '
];
const defaultOption = options[0];
const whiteList = ['content-search', 'question-type', 'search-input'];

interface IProps {
	fetchData: (title: string, type: string) => any;
	data: null | Array<{ data: any; type: string }>;
	loading: boolean;
	error: string;
	history: any;
}

interface IState {
	title: string;
	type: string;
	showModal: boolean;
	redirectAdvanceSearch: boolean;
}

class ContentSearch extends React.Component<IProps, IState> {
	state = {
		title: '',
		type: defaultOption,
		showModal: false,
		redirectAdvanceSearch: false
	};

	static isEmpty(data) {
		return !(data && data.some(elem => elem.data && elem.data.length > 0));
	}

	componentDidMount(): void {
		document.addEventListener('click', (e: any) => {
			if (!(e && e.target && e.target.classList)) return this.setModal(false);

			const classList = e.target.classList;

			if (whiteList.indexOf(classList[0]) === -1) {
				return this.setModal(false);
			}
		});
	}

	setModal(option: boolean) {
		this.setState({ showModal: option });
	}

	showModal(): boolean {
		if (window.location.pathname === '/content-search') return false;
		return this.state.showModal || this.props.loading || !!this.props.error;
	}

	render() {
		const { title, type, redirectAdvanceSearch } = this.state;
		if (redirectAdvanceSearch) {
			this.setState({ redirectAdvanceSearch: false });
			return <Redirect to={'/advanced-search'} />;
		}

		const { fetchData, data } = this.props;

		return (
			<div className={'content-search'}>
				<span className="search">
					<span
						className={'search-icon-wrp'}
						onClick={() => {
							if (title.trim()) {
								fetchData(title, type);
								this.setModal(true);
							}
						}}
					>
						<SearchIcon className={'search-icon'} />
					</span>
					<input
						type="text"
						placeholder="Search"
						value={title}
						className="search-input"
						onChange={e => this.setState({ title: e.target.value })}
						onKeyPress={e => {
							if (e.which === 13 && title.trim()) {
								fetchData(title, type);
								this.setModal(true);
							}
						}}
						onFocus={() =>
							ContentSearch.isEmpty(data) ? null : this.setModal(true)
						}
					/>
				</span>
				<select
					className="question-type"
					value={type}
					onChange={event => {
						if (event.target.value !== 'advance movie search   ')
							return this.setState({ type: event.target.value });

						this.setState({ redirectAdvanceSearch: true });
					}}
				>
					{options.map(option => (
						<option value={option}>{option}&nbsp;</option>
					))}
				</select>
				<div
					className={
						'modal-data-search ' +
						(this.showModal() ? 'modal-data-search-show' : '')
					}
				>
					<ResultList redirect={true} />
				</div>
			</div>
		);
	}
}

const mapStateToProps = (rootState, props) => ({
	...props,
	data: rootState.contentSearch.data,
	loading: rootState.contentSearch.loading,
	error: rootState.contentSearch.error
});

const actions = {
	fetchData
};

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ContentSearch);
