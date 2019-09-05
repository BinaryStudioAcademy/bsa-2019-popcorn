import * as React from 'react';

interface IConfirmChangesProps {
	confirm: (token: string) => any;
}

class ConfirmChange extends React.Component<IConfirmChangesProps> {
	componentDidMount() {
		const token = window.location.pathname.split('/')[2];
		this.props.confirm(token);
	}
	render() {
		return (
			<div>
				<p>Changes confirmed</p>
			</div>
		);
	}
}

export default ConfirmChange;
