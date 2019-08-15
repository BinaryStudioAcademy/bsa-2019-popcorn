import * as React from 'react';
import { Form, Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './Registration.scss';
import { NavLink, Redirect } from 'react-router-dom';
import logo from '../../../assets/icons/general/popcorn-logo.svg';

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
			takenError: this.props.registerError
		};
	}

	public render() {
		const { registration, isAuthorized, registerError } = this.props;
		const { isLoading } = this.state;
		const takenError = this.state.takenError || registerError;
		console.log(takenError);
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
							initialValues={{ ...initialFormikValues }}
							onSubmit={async (values, actions) => {
								const { isLoading } = this.state;
								if (isLoading) {
									// block button
									return;
								}
								this.setState({ ...this.state, isLoading: true });
								registration({ ...values }); // { name, email, password } --- will update props isAuthorized
								// .then((s: any) => { return 0 })
								// .catch((error: any) => {
								//   actions.setFieldError('email', error.message);
								//   this.setState({ isLoading: false });
								// });
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
							render={({ errors, status, touched }) => (
								<Form>
									<div className="form-group">
										<label
											className="form-label"
											onChange={() => this.setState({ takenError: ' ' })}
										>
											<Field
												name="name"
												type="text"
												placeholder="First and Last name"
												className={
													'form-input' +
													(errors.name && touched.name ? ' is-invalid' : '')
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
											onChange={() => this.setState({ takenError: ' ' })}
										>
											<Field
												name="email"
												type="text"
												placeholder="Email address"
												className={
													'form-input' +
													(errors.email && touched.email ? ' is-invalid' : '')
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
													(errors.password && touched.password
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
										<div className="register-error">{registerError}</div>
										<div className="form-btn-wrapper">
											<button
												type="submit"
												className={`form-btn ${isLoading ? 'disabled' : ''}`}
											>
												Sign Up
											</button>
										</div>
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
						</div>
					</div>
				)}
			</div>
		);
	}
}

export default Registration;
