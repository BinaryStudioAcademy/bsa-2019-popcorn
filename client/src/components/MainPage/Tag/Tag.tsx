import React, { Component } from 'react';
import './Tag.scss';

type ITagProps = {
	tagItem: {
		id: string;
		tagName: string;
	};
};

const Tag = ({ tagItem: { tagName } }: ITagProps) => {
	return (
		<p className="tag-item">
			<span> &#35;</span>
			<i>{tagName}</i>
		</p>
	);
};
export default Tag;
