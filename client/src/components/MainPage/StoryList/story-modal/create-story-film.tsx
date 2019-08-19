import React, { useState } from 'react';

const options = ["I've watched", "I'm going to watch", 'I recommend'];

const CreateStoryFilm = () => {
	const [option, setOption] = useState(options[0]);
	return (
		<div className={'modal modal-story'}>
			<div className={'movie-add-wrp'}>
				<div className={'edit-form'}>
					<textarea placeholder="Type a text here..." />
				</div>
				<select
					className="question-type"
					value={option}
					onChange={event => {
						setOption(event.target.value);
					}}
				>
					{options.map(option => (
						<option value={option}>{option}</option>
					))}
				</select>
			</div>
		</div>
	);
};

export default CreateStoryFilm;
