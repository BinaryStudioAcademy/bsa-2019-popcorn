import React from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { NavLink, Redirect } from 'react-router-dom';

interface Values {
	name: string;
	email: string;
	password: string;
}

interface IProps {
	isAuthorized: boolean;
	restoreMessage: string;
	match?: {
		params: {
			token: string;
		};
	};
	fetchRestorePassword: (password: string, token: string) => any;
}

interface IState {
	isLoading: boolean;
}

const initialFormikValues = {
	password: ''
};

class Restore extends React.Component<IProps, IState> {
	state: IState = {
		isLoading: false
	};

	public render() {
		const token = this.props.match && this.props.match.params.token;

		const { fetchRestorePassword, isAuthorized, restoreMessage } = this.props;
		const { isLoading } = this.state;

		if (restoreMessage)
			return (
				<div className="form-wrapper">
					<NavLink to={'/login'} className="form-hint-link">
						{restoreMessage}
					</NavLink>
					<i className="icon icon-arrow-right" />
				</div>
			);

		return (
			<div className={'form-wrapper'}>
				{isAuthorized && token ? (
					<Redirect to="/" />
				) : (
					<div>
						<h5 className="form-heading">Restore password</h5>
						<Formik
							initialValues={{ ...initialFormikValues }}
							onSubmit={async (values, actions) => {
								const { isLoading } = this.state;
								if (isLoading) {
									// block button
									return;
								}
								this.setState({ ...this.state, isLoading: true });

								fetchRestorePassword(values.password, token || '');
							}}
							validationSchema={Yup.object().shape({
								password: Yup.string()
									.min(6, 'Password must be at least 6 characters')
									.required('Password is required')
							})}
							render={({ errors, status, touched }) => (
								<Form>
									<div className="form-group">
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

export default Restore;
