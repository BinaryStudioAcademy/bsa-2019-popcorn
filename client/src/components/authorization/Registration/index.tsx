import * as React from 'react';
import { Form, Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './Registration.scss';
import { NavLink, Redirect } from 'react-router-dom';
import logo from '../../../assets/icons/general/popcorn-logo.svg';
import Spinner from '../../shared/Spinner';
import {
	FacebookLoginButton,
	GoogleLoginButton
} from 'react-social-login-buttons';
import config from './../../../config';

interface Values {
	name: string;
	email: string;
	password: string;
}

interface IProps {
	registration: (values: Values) => any;
	isAuthorized: boolean;
	registerError: string | null;
}

interface IState {
	isLoading: boolean;
	takenError: string | null;
	formikValues: Values;
}

const initialFormikValues = {
	name: '',
	email: '',
	password: ''
};

const EMAIL_IS_TAKEN = 'Email is already taken.';
const USERNAME_IS_TAKEN = 'Username is already taken.';

function validateEmail(value) {
	let error;
	if (!value) {
		error = 'Required';
	} else if (
		!/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/i.test(
			value
		)
	) {
		error = 'Email is invalid';
	}
	return error;
}

function validatePassword(value) {
	let error;
	if (!value) {
		error = 'Required';
	} else if (!/^[0-9a-zA-Z`!@#$%^&*()+=_-{}[\]|:;<>”’?]+$/im.test(value)) {
		error = 'Password is invalid';
	}
	return error;
}

class Registration extends React.Component<IProps, IState> {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: false,
			takenError: '',
			formikValues: {
				name: '',
				password: '',
				email: ''
			}
		};
	}

	cancelError = () => {
		this.setState({ ...this.state, isLoading: false, takenError: '' });
	};

	componentDidMount() {
		const takenError = this.props.registerError;
		this.setState({ takenError });
	}
	static getDerivedStateFromProps(props, currentState) {
		if (currentState.takenError !== props.registerError) {
			return {
				...currentState,
				takenError: props.registerError,
				isLoading: false
			};
		}
		return null;
	}

	public render() {
		const { registration, isAuthorized, registerError } = this.props;
		const { isLoading, takenError } = this.state;
		return (
			<div className={'form-wrapper'}>
				{isAuthorized ? (
					<Redirect to="/" />
				) : (
					<div>
						<div className="logo-wrapper">
							<img src={logo} className="logo" alt="logo" />
						</div>
						<h1 className="form-heading">Join Pop Corn</h1>
						<Formik
							initialValues={initialFormikValues}
							onSubmit={async (values, actions) => {
								const { isLoading } = this.state;
								if (isLoading) {
									return;
								}
								Object.keys(values).forEach(key => {
									initialFormikValues[key] = values[key];
								});
								registration({ ...values });
								this.setState({
									...this.state,
									formikValues: values,
									isLoading: true
								});
							}}
							validationSchema={Yup.object().shape({
								name: Yup.string()
									.strict(false)
									.trim()
									.min(3, 'Username must be at least 3 characters')
									.max(20, 'Username must be no more than 20 characters')
									.required('Name is required'),
								email: Yup.string()
									.max(320, 'Email must be no more than 320 characters')
									.email('Email is invalid')
									.required('Email is required'),
								password: Yup.string()
									.min(6, 'Password must be at least 6 characters')
									.max(64, 'Password must be no more than 64 characters')
									.required('Password is required')
							})}
							render={props => (
								<Form>
									<div className="form-group">
										<label
											className="form-label"
											onChange={() => this.cancelError()}
										>
											<Field
												name="name"
												type="text"
												value={props.values.name}
												placeholder="First and Last name"
												className={
													'form-input' +
													(props.errors.name && props.touched.name
														? ' is-invalid'
														: '')
												}
											/>
											<ErrorMessage
												name="name"
												component="span"
												className="form-input-error"
											/>
											{takenError === USERNAME_IS_TAKEN && (
												<p className="error-message">{registerError}</p>
											)}
										</label>
										<label
											className="form-label"
											onChange={() => this.cancelError()}
										>
											<Field
												name="email"
												type="text"
												placeholder="Email address"
												className={
													'form-input' +
													(props.errors.email && props.touched.email
														? ' is-invalid'
														: '')
												}
												validate={validateEmail}
											/>
											<ErrorMessage
												name="email"
												component="span"
												className="form-input-error"
											/>
											{takenError === EMAIL_IS_TAKEN && (
												<p className="error-message">{registerError}</p>
											)}
										</label>
										<label className="form-label">
											<Field
												name="password"
												type="password"
												placeholder="Password"
												className={
													'form-input' +
													(props.errors.password && props.touched.password
														? ' is-invalid'
														: '')
												}
												validate={validatePassword}
											/>
											<ErrorMessage
												name="password"
												component="span"
												className="form-input-error"
											/>
										</label>

										<div className="form-btn-wrapper">
											<button
												type="submit"
												className={`form-btn ${isLoading ? 'disabled' : ''}`}
											>
												Sign Up
											</button>
										</div>
										{isLoading && <Spinner />}
									</div>
								</Form>
							)}
						/>
						<div className="form-hint">
							Already have an account? &nbsp;
							<NavLink to={'/login'} className="form-hint-link">
								Login
							</NavLink>
							<i className="icon icon-arrow-right"> > </i>
							<div style={{ marginTop: 20 }}>
								<a href={`${config.API_URL}/api/auth/google`}>
									<GoogleLoginButton text={'Signup with Google'} />
								</a>
								<a href={`${config.API_URL}/api/auth/facebook`}>
									<FacebookLoginButton text={'Signup with Facebook'} />
								</a>
							</div>
						</div>
					</div>
				)}
			</div>
		);
	}
}

export default Registration;
