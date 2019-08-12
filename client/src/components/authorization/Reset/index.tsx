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
	registration: (values: Values) => any;
	isAuthorized: boolean;
	registerError: string | null;
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
		const { registration, isAuthorized } = this.props;
		const { isLoading } = this.state;

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
