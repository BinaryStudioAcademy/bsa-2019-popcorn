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
}

const initialFormikValues = {
	name: '',
	email: '',
	password: ''
};

class Registration extends React.Component<IProps, IState> {
	state: IState = {
		isLoading: false
	};

	public render() {
		const { registration, isAuthorized, registerError } = this.props;
		const { isLoading } = this.state;

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
									.max(20, 'Its too long Name')
									.required('Name is required'),
								email: Yup.string()
									.max(254, 'Its too long email')
									.email('Email is invalid')
									.required('Email is required'),
								password: Yup.string()
									.min(6, 'Password must be at least 6 characters')
									.required('Password is required')
							})}
							render={({ errors, status, touched }) => (
								<Form>
									<div className="form-group">
										<label className="form-label">
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
										</label>
										<label className="form-label">
											<Field
												name="email"
												type="text"
												placeholder="Email address"
												className={
													'form-input' +
													(errors.email && touched.email ? ' is-invalid' : '')
												}
											/>
											<ErrorMessage
												name="email"
												component="span"
												className="form-input-error"
											/>
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
											/>
											<ErrorMessage
												name="password"
												component="span"
												className="form-input-error"
											/>
										</label>
										{registerError}
										<div className="form-btn-wrapper">
											<button
												type="submit"
												className={`form-btn ${isLoading ? 'disabled' : ''}`}
											>
												Sign Up
											</button>
											{isLoading ? 'loading...' : null}
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
