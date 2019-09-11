import * as React from 'react';
import { Redirect } from 'react-router-dom';
import './ConfirmChanges.scss';
interface IConfirmChangesProps {
	confirm: (token: string) => any;
	success: boolean;
}

class ConfirmChange extends React.Component<IConfirmChangesProps> {
	componentDidMount() {
		const token = window.location.pathname.split('/')[2];
		this.props.confirm(token);
	}
	render() {
		console.log(this.props.success);
		return this.props.success ? (
			<Redirect to="/login" />
		) : (
			<div className="confirm-wrp">
				<p className="confirm-txt-wrp">Changes confirmed</p>
			</div>
		);
	}
}

export default ConfirmChange;
