import React, { Component } from 'react';

interface IProfileEditorProps {
	user: any;
}

interface IProfileEditorState {}

class ProfileEditor extends Component<
	IProfileEditorProps,
	IProfileEditorState
> {
	constructor(props: IProfileEditorProps) {
		super(props);
		this.state = {};
	}

	render() {
		return <div>Editing</div>;
	}
}

export default ProfileEditor;
