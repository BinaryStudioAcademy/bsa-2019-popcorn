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
		user: {},
		participants: 0,
		questions: [
			{
				id: questionId,
				survey_id: surveyId,
				title: 'Untitled question',
				firstLabel: '',
				lastLabel: '',
				type: 'Multiple choice',
				image_link: '',
				required: false,
				options: [
					{
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
