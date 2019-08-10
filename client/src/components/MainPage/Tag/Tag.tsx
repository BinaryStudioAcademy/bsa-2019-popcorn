import React, { Component } from "react";
import "./Tag.scss"

type ITagProps = {
    tagItem:{
		id: string,
		tagBody: string
    }
}

const Tag = ({ tagItem: {tagBody} }: ITagProps) => {
	return (
		<p className="tag-item">
			&#35;<i>{tagBody}</i>
		</p>
	);
}
export default Tag;
