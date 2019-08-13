import React, { PureComponent } from 'react';
import { NavLink } from 'react-router-dom';
import Modal from '@material-ui/core/Modal';
import './ErrorModal.scss';

interface IProps {
	erorrBody: string;
}

interface IState {
	hasError: boolean;
}

class ErrorBoundary extends PureComponent<IProps, IState> {
	constructor(props) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError(error) {
		// Update state so the next render will show the fallback UI.
		return { hasError: true };
	}

	componentDidCatch(error, errorInfo) {
		// You can also log the error to an error reporting service
	}

	render() {
		const { hasError } = this.state;
		if (hasError) {
			return (
				<Modal open={true}>
					<section className="modal">
						<div className="modal-main">
							<h2 className="modal-title">Error</h2>
							<p className="modal-error-description">{this.props.erorrBody}</p>
							<p className="modal-body">
								{'Go to '}
								<NavLink to="/" className="notFound-link">
									Home
								</NavLink>
								{' page'}
							</p>
							<a href="#" className="btn">
								Close
							</a>
						</div>
					</section>
				</Modal>
			);
		}

		return this.props.children;
	}
}
export default ErrorBoundary;
