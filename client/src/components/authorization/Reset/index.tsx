import React from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { NavLink, Redirect } from 'react-router-dom';
import { fetchResetPassword } from '../actions';

interface Values {
	name: string;
	email: string;
	password: string;
}

interface IProps {
	fetchResetPassword: (email: string) => any;
	isAuthorized: boolean;
	resetMessage: string;
}

interface IState {
	isLoading: boolean;
}

const initialFormikValues = {
	email: ''
};

class Reset extends React.Component<IProps, IState> {
	state: IState = {
		isLoading: false
	};

	public render() {
		const { fetchResetPassword, isAuthorized, resetMessage } = this.props;
		const { isLoading } = this.state;

		if (resetMessage)
			return <div className={'form-wrapper'}>{resetMessage}</div>;

		return (
			<div className={'form-wrapper'}>
				{isAuthorized ? (
					<Redirect to="/" />
				) : (
					<div>
						<h5 className="form-heading">Reset password</h5>
						<Formik
							initialValues={{ ...initialFormikValues }}
							onSubmit={async (values, actions) => {
								const { isLoading } = this.state;
								if (isLoading) {
									return;
								}
								this.setState({ ...this.state, isLoading: true });

								fetchResetPassword(values.email);
							}}
							validationSchema={Yup.object().shape({
								email: Yup.string()
									.max(254, 'Its too long email')
									.email('Email is invalid')
									.required('Email is required')
							})}
							render={({ errors, status, touched }) => (
								<Form>
									<div className="form-group">
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

										<div className="form-btn-wrapper">
											<button
												type="submit"
												className={`form-btn ${isLoading ? 'disabled' : ''}`}
											>
												Reset
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

export default Reset;
