import React, { Component } from 'react';

interface IProps {
	src: string | undefined;
	defaultSrc: string | undefined;
	alt: string;
}

interface IState {
	src: string | undefined;
	errored: boolean;
}

class Image extends React.Component<IProps, IState> {
	constructor(props: IProps) {
		super(props);

		this.state = {
			src: props.src,
			errored: false
		};
	}

	onError = () => {
		if (!this.state.errored) {
			this.setState({
				src: this.props.defaultSrc,
				errored: true
			});
		}
	};

	render() {
		const { src } = this.state;

		return <img src={src} onError={this.onError} alt={this.props.alt} />;
	}
}

export default Image;
