import { v4 as uuid } from 'uuid';

export default () => {
	const surveyId = uuid();
	const questionId = uuid();

	return {
		id: surveyId,
		created_at: new Date(),
		title: 'New survey',
		description: '',
		type: 'Open',
		user_id: '',
		image: '',
		user: {},
		participants: 0,
		questions: [
			{
				id: questionId,
				index: 0,
				survey_id: surveyId,
				title: 'Untitled question',
				firstLabel: '',
				lastLabel: '',
				type: 'Multiple choice',
				image_link: '',
				required: false,
				options: [
					{
						index: 0,
						id: uuid(),
						question_id: questionId,
						value: 'Option 1'
					}
				],
				answers: []
			}
		]
	};
};
