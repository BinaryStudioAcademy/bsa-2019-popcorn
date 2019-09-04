import React from 'react';
import UserInterface from './../UserSettingsInterface';
import './../../UserPage/SurveyItems/SurveyShortAnswer/SurveyShortAnswer.scss';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Spinner from '../../shared/Spinner';
import { updateEmail, updatePassword, deleteUser } from './../actions';

interface IProps {
	profileInfo: UserInterface;
	updateEmail: (userId: string, email: string) => void;
	updatePassword: (userId: string, password: string) => void;
	deleteUser: (userId: string) => void;
	loading: boolean;
}

interface IState {
	EmailnewEmail: string;
	EmailnewEmailError: string;
	EmailnewEmailFocus: boolean;
	EmailCurrPassword: string;
	EmailCurrPasswordFocus: boolean;
	EmailCurrPasswordError: string;
	PasswordCurrPassword: string;
	PasswordCurrPasswordFocus: boolean;
	PasswordCurrPasswordError: string;
	PasswordNewPassword: string;
	PasswordNewPasswordFocus: boolean;
	PasswordNewPasswordError: string;
}

interface IErrorPasswordMessage {
	required: string;
	length: string;
	correct: string;
}

class AccountPreferences extends React.Component<IProps, IState> {
	errorPasswordMessage: IErrorPasswordMessage;

	constructor(props) {
		super(props);

		this.state = {
			EmailnewEmail: '',
			EmailnewEmailFocus: false,
			EmailnewEmailError: '',
			EmailCurrPassword: '',
			EmailCurrPasswordFocus: false,
			EmailCurrPasswordError: '',
			PasswordCurrPassword: '',
			PasswordCurrPasswordFocus: false,
			PasswordCurrPasswordError: '',
			PasswordNewPassword: '',
			PasswordNewPasswordFocus: false,
			PasswordNewPasswordError: ''
		};

		this.errorPasswordMessage = {
			required: 'Password is required',
			length: 'Password must be at least 6 characters',
			correct: 'Password is incorrect'
		};
	}

	validateEmail = (email: string) => {
		var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		if (email.trim() === '') return { error: 'Email is required' };
		else if (!re.test(String(email).toLowerCase()))
			return { error: 'Email is invalid' };
		else return { error: null, success: true };
	};

	validatePassword = password => {
		if (password.trim() === '') return { error: this.errorPasswordMessage.required };
		else if (password.length < 6)
			return {
				error: this.errorPasswordMessage.length
			};
		else return { error: null, success: true };
	};

	updateEmail(ev) {
		ev.preventDefault();

		const {
			password: userPassword,
			id: userId
		} = this.props.profileInfo;
		const {
			EmailnewEmail,
			EmailCurrPassword,
			EmailCurrPasswordError
		} = this.state;
		
		if (!EmailCurrPasswordError && EmailCurrPassword !== userPassword) {
			this.setState({ EmailCurrPasswordError: this.errorPasswordMessage.correct });
			return;
		}

		const { updateEmail } = this.props;
		updateEmail(userId, EmailnewEmail);
	}

	updatePassword(ev) {
		ev.preventDefault();
		
		const {
			password: userPassword,
			id: userId
		} = this.props.profileInfo;
		const {
			PasswordCurrPassword,
			PasswordNewPassword,
			PasswordCurrPasswordError
		} = this.state;

		if (!PasswordCurrPasswordError && PasswordCurrPassword !== userPassword) {
			this.setState({ PasswordCurrPasswordError: this.errorPasswordMessage.correct });
			return;
		}

		const { updatePassword } = this.props;
		updatePassword(userId, PasswordNewPassword);
	}

	deleteAccount(ev) {
		const { id: userId } = this.props.profileInfo;
		const { deleteUser } = this.props;
		deleteUser(userId);
	}

	render() {
		const { loading } = this.props;
		const { email } = this.props.profileInfo;
		const {
			EmailnewEmailError,
			EmailCurrPasswordError,
			PasswordCurrPasswordError,
			PasswordNewPasswordError
		} = this.state;
		return loading ? (
			<Spinner />
		) : (
			<div className={'survey settings'}>
				<form className={'settings-form'}>
					<div className={'question-container settings-container'}>
						<h3 className="survey-question settings-title">
							Change your email address
						</h3>
						<p className="settings-current-info-wrapper">
							Current email:{' '}
							<span className="settings-current-info">{email}</span>
						</p>
						<div className="settings-input-wrapper">
							<label>New email</label>
							<input
								className="settings-input"
								type="text"
								name="email"
								placeholder="Email address"
								onBlur={ev => {
									const res = this.validateEmail(ev.target.value);
									this.setState({ EmailnewEmailFocus: false });
									res.error && this.setState({ EmailnewEmailError: res.error });
								}}
								onChange={ev =>
									this.setState({
										EmailnewEmail: ev.target.value
									})
								}
								onFocus={() => {
									this.setState({
										EmailnewEmailError: '',
										EmailnewEmailFocus: true
									});
								}}
							/>
						</div>
						{EmailnewEmailError && (
							<p className={'error-message'}>{EmailnewEmailError}</p>
						)}
						<div className="settings-input-wrapper">
							<label>Current password</label>
							<input
								className="settings-input"
								type="password"
								name="password"
								placeholder="Password"
								onBlur={ev => {
									const res = this.validatePassword(ev.target.value);
									this.setState({ EmailCurrPasswordFocus: false });
									res.error &&
										this.setState({ EmailCurrPasswordError: res.error });
								}}
								onFocus={() => {
									this.setState({
										EmailCurrPasswordError: '',
										EmailCurrPasswordFocus: true
									});
								}}
								onChange={ev =>
									this.setState({
										EmailCurrPassword: ev.target.value
									})
								}
							/>
						</div>
						{EmailCurrPasswordError && (
							<p className={'error-message'}>{EmailCurrPasswordError}</p>
						)}
						<div className="settings-btn-wrapper">
							<button
								className="settings-btn"
								onClick={ev => this.updateEmail(ev)}
								disabled={!!(EmailCurrPasswordError || EmailnewEmailError)}
							>
								Save
							</button>
						</div>
					</div>
					<div className={'question-container settings-container'}>
						<h3 className={'survey-question'}>Change your password</h3>
						<div className="settings-input-wrapper">
							<label>Current Password</label>
							<input
								className="settings-input"
								type="password"
								name="password"
								placeholder="Current password"
								onBlur={ev => {
									const res = this.validatePassword(ev.target.value);
									this.setState({ PasswordCurrPasswordFocus: false });
									res.error &&
										this.setState({ PasswordCurrPasswordError: res.error });
								}}
								onFocus={() => {
									this.setState({
										PasswordCurrPasswordError: '',
										PasswordCurrPasswordFocus: true
									});
								}}
								onChange={ev =>
									this.setState({
										PasswordCurrPassword: ev.target.value
									})
								}
							/>
						</div>
						{PasswordCurrPasswordError && (
							<p className={'error-message'}>{PasswordCurrPasswordError}</p>
						)}
						<div className="settings-input-wrapper">
							<label>New password</label>
							<input
								className="settings-input"
								type="password"
								name="password"
								placeholder="New password"
								onBlur={ev => {
									const res = this.validatePassword(ev.target.value);
									this.setState({ PasswordNewPasswordFocus: false });
									res.error &&
										this.setState({ PasswordNewPasswordError: res.error });
								}}
								onFocus={() => {
									this.setState({
										PasswordNewPasswordError: '',
										PasswordNewPasswordFocus: true
									});
								}}
								onChange={ev =>
									this.setState({
										PasswordNewPassword: ev.target.value
									})
								}
							/>
						</div>
						{PasswordNewPasswordError && (
							<p className={'error-message'}>{PasswordNewPasswordError}</p>
						)}
						<div className="settings-btn-wrapper">
							<button
								className="settings-btn"
								onClick={ev => this.updatePassword(ev)}
								disabled={
									!!(PasswordNewPasswordError || PasswordCurrPasswordError)
								}
							>
								Save
							</button>
						</div>
					</div>
					<div className={'question-container settings-container'}>
						<h3 className={'survey-question'}>Delete account</h3>
						<p className="settings-current-info-wrapper info-settings">
							This account will no longer be available and all data in the
							account will be permanently deleted
						</p>
						<button
							className="settings-btn"
							onClick={ev => this.deleteAccount(ev)}
						>
							Permanently delete this account
						</button>
					</div>
				</form>
			</div>
		);
	}
}

const mapStateToProps = (rootState, props) => ({
	...props,
	profileInfo: rootState.profile.profileInfo,
	loading: rootState.profile.loading
});
const actions = {
	updateEmail,
	updatePassword,
	deleteUser
};

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(AccountPreferences);
