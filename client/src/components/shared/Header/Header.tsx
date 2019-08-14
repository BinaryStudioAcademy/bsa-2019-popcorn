import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import './Header.scss';
import messageIcon from '../../../assets/icons/general/header/message-icon.svg';
import notifyIcon from '../../../assets/icons/general/header/notify-icon.svg';
import logo from '../../../assets/icons/general/popcorn-logo.svg';
import MovieSearch from '../../MovieList/MovieSearch/index';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchFilms } from '../Header/actions';
import { NavLink, Link } from 'react-router-dom';
import { setMovieSeries } from '../../MovieSeriesPage/Movie.redux/actions';
import config from '../../../config';

interface IProps {
	userInfo: {
		//temporary put ? to use mocks inside component
		name: string;
		image: string;
	};
	movies?: Array<string>;
	tv?: Array<string>;
	ratings?: Array<string>;
	moviesSearch?: Array<{
		id: string;
		title: string;
		year: Date;
		image: string;
		duration: string;
		genres: Array<string>;
		cast: Array<string>;
	}>;
	fetchFilms: () => void;
	alreadySearch: boolean;
	setMovieSeries: (movie: any) => any;
}

const user = {
	name: 'Sofi Dub',
	image:
		'https://s3-alpha-sig.figma.com/img/919e/1a5a/da4f250d469108191ad9d4af68b2a639?Expires=1566172800&Signature=Kou41Z8bd8ig~9nLibgCH5gfaOc0K~9Io82-umabjJnomveXbPcqMWfD911bHy6h77reHT6ecNYFHCzmXkQNy3vEF-OzgJYgV875TI2rX~cPt1FaSJC5wCeybEfTrlBlCcdzSFn8iVcP~C8GTx-l6CIjyugGAhvr7xJ-hfAdlf~5Mll0Sy92dSKn8q7OkJdfsMvEEFVQ3rGHn8GGQZg1a60gif0VaQhuVX1gcRgwrsak~cerS1bnDvo93B1lFOIk85wlhY2hPwQrmCtI9A-qaAtbIxmzmxkRpuVUpDrX6Jd4hXpksbd7urSJ91Dg7tv9WzRZvIkLnPXflCfmPw~slw__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA'
};

const mock = ['Movies in cinema', 'Top movies', 'On DVD'];

const Header = ({
	userInfo = user,
	movies = ['Movies in cinema', 'Movie tops', `${userInfo.name}'s Movie Lists`],
	tv = [
		'New TV Series',
		'TV Series tops',
		`${userInfo.name}'s TV Series Lists`
	],
	ratings = ['Popular Movies', 'Popular TV Series', 'Popular Users'],
	moviesSearch,
	fetchFilms,
	alreadySearch,
	setMovieSeries
}: IProps) => {
	return (
		<div className="header">
			<NavLink to="/" className="header-logo-link">
				<div className="logo-wrapper">
					<img src={logo} className="logo" alt="logo" />
				</div>
				<div className="title">Pop Corn</div>
			</NavLink>
			<button className="header-buttons hover">
				<NavLink
					to={'/movie-list'}
					style={{ textDecoration: 'none' }}
					className="header-buttons"
				>
					Movies
				</NavLink>
				<FontAwesomeIcon icon={faChevronDown} />
				<div className="modal">
					<Link aria-current="page" className="hover" to="#">
						{movies[0]}
					</Link>
					<Link aria-current="page" className="hover" to="/movie-tops">
						{movies[1]}
					</Link>
					<Link aria-current="page" className="hover" to="/user-page/lists">
						{movies[2]}
					</Link>
				</div>
			</button>

			<button className="header-buttons hover">
				TV
				<FontAwesomeIcon icon={faChevronDown} />
				<div className="modal">
					<Link aria-current="page" className="hover" to="#">
						{tv[0]}
					</Link>
					<Link aria-current="page" className="hover" to="#">
						{tv[1]}
					</Link>
					<Link aria-current="page" className="hover" to="/user-page/lists">
						{tv[2]}
					</Link>
				</div>
			</button>
			<button className="header-buttons hover">
				Ratings
				<FontAwesomeIcon icon={faChevronDown} />
				<div className="modal">
					<Link aria-current="page" className="hover" to="#">
						{ratings[0]}
					</Link>
					<Link aria-current="page" className="hover" to="#">
						{ratings[1]}
					</Link>
					<Link aria-current="page" className="hover" to="#">
						{ratings[2]}
					</Link>
				</div>
			</button>
			<MovieSearch
				movies={moviesSearch}
				fetchFilms={fetchFilms}
				alreadySearch={alreadySearch}
				setMovieSeries={setMovieSeries}
			/>
			<div className="notifications">
				<img className="message-icon hover" src={messageIcon} alt="message" />
				<NavLink to={'/user-activity'}>
					<img className="notify-icon hover" src={notifyIcon} alt="bell" />
				</NavLink>
			</div>
			<NavLink to={'/user-page'} className="user-info hover">
				<img src={userInfo.image || config.DEFAULT_AVATAR} alt="avatar" />
				<span className="user-name">{userInfo.name}</span>
			</NavLink>
		</div>
	);
};

const mapStateToProps = (rootState, props) => ({
	moviesSearch: rootState.movie.moviesSearch,
	alreadySearch: rootState.movie.alreadySearch,
	...props
});

const actions = {
	fetchFilms,
	setMovieSeries
};

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Header);
