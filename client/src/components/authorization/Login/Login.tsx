import * as React from "react";
import { Form, Formik, Field, ErrorMessage } from "formik";
import { Redirect, NavLink } from 'react-router-dom';
import * as Yup from 'yup';
import "./style.scss";

interface IValues {
  email: string;
  password: string;
}

interface IProps {
  onSubmit: (values: IValues) => any;
  isAuthorized: boolean;
}

interface IState {
  isLoading: boolean;
}

class Login extends React.Component<IProps, IState, IValues> {

  state: IState = { isLoading: false };


  render() {
    const { onSubmit, isAuthorized } = this.props;
    const { isLoading } = this.state;

    return !isAuthorized ? (
      <div className="form-wrapper">
        <h1 className="form-heading">Welcome back!</h1>
        <Formik
          initialValues={{ password: "", email: "" }}
          onSubmit={(values, actions) => {
            this.setState({
              isLoading: true
            });
            onSubmit(values)
              // .then(() => {
              //   //redirect if ok
              // })
              // .catch((error: any) => {
              //   actions.setFieldError('email', error.message);
              // })
              // .finally(() => {
              //   actions.setSubmitting(false);
              //   this.setState({
              //     isLoading: false
              //   })
              // });
          }}
          validationSchema={Yup.object().shape({
            email: Yup.string()
              .email('Email is invalid')
              .required('Email is required'),
            password: Yup.string()
              .min(5, 'Password must be at least 6 characters')
              .required('Password is required'),
          })}
          render={({ errors, status, touched }) => (
            <Form>
              <div className="form-group">
                <label className="form-label">
                  <Field name="email" type="text" placeholder="Email address" className={'form-input' + (errors.email && touched.email ? ' is-invalid' : '')} />
                  <ErrorMessage name="email" component="span" className="form-input-error" />
                </label>
                <label className="form-label">
                  <Field name="password" type="password" placeholder="Password" className={'form-input' + (errors.password && touched.password ? ' is-invalid' : '')} />
                  <ErrorMessage name="password" component="span" className="form-input-error" />
                </label>
                <div className="form-btn-wrapper">
                  <button type="submit" className={`form-btn ${isLoading ? 'disabled' : ''}`}>Sign In</button>
                </div>
              </div>
            </Form>
          )}
        />
        <div className="form-hint">Already have an account?
            &nbsp;
            <NavLink to={"/registration"} className="form-hint-link">Register
            </NavLink>
          <i className="icon icon-arrow-right">></i>
        </div>
      </div>
    )
        : <Redirect to="/" />;
  };
};


export default Login;
