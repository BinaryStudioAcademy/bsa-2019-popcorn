import React from 'react';

interface IProps {
	src: string | undefined;
	defaultSrc: string | undefined;
	alt: string;
	className?: string;
}

interface IState {
	src: string | undefined;
	errored: boolean;
}

class Image extends React.Component<IProps, IState> {
	constructor(props: IProps) {
		super(props);

		this.state = {
			src: props.src ? props.src : props.defaultSrc,
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
		const { errored, src } = this.state;
		const { className, alt, defaultSrc } = this.props;
		return (
			<img
				src={errored ? defaultSrc : src}
				onError={this.onError}
				alt={alt}
				className={className}
			/>
		);
	}
}

export default Image;
