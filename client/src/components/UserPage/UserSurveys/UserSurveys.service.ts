interface ISurvey {
	id: string;
	created_at: Date;
	title: string;
	type: string;
	description: string;
	user_id: string;
	user: {
		name: string;
		image_link: string;
	};
	participants: number;
	questions: Array<{
		index: number;
		id: string;
		survey_id: string;
		title: string;
		firstLabel?: string;
		lastLabel?: string;
		type: string;
		image_link?: string;
		required: boolean;
		options?: Array<{
			index: number;
			id: string;
			question_id: string;
			value: string;
		}>;
		answers: Array<{
			id: string;
			question_id: string;
			option_id?: string;
			user_id: string;
			value: string;
		}>;
	}>;
}

export const transformDataToProps = (data): Array<ISurvey> => {
	const transformData = data.map(survey => ({
		id: survey.id,
		created_at: survey.created_at,
		title: survey.title,
		type: survey.type,
		description: survey.description,
		user_id: survey.user.id,
		user: {
			name: survey.user.name,
			image_link: survey.user.avatar
		},
		participants: countParticipants(survey.surveysQuestion),
		questions: survey.surveysQuestion.map(question => ({
			index: question.index,
			id: question.id,
			survey_id: survey.id,
			title: question.title,
			firstLabel: question.firstLabel,
			lastLabel: question.lastLabel,
			type: question.type,
			image_link: question.image,
			required: question.required,
			options: question.surveysQuestionOption.map(option => ({
				index: option.index,
				id: option.id,
				question_id: question.id,
				value: option.title
			})),
			answers: question.surveysQuestionAnswer.map(answer => ({
				id: answer.id,
				question_id: question.id,
				option_id:
					answer.surveysQuestionOption && answer.surveysQuestionOption.id,
				user_id: answer.user.id,
				value: answer.value
			}))
		}))
	}));
	return transformData;
};

const countParticipants = questions => {
	const answererIds = questions
		.flatMap(question => question.surveysQuestionAnswer)
		.map(answer => answer.user.id);
	const uniqueUserIds = new Set(answererIds);
	return uniqueUserIds.size;
};

export const transformDataToServerFormatCreate = data => {
	return {
		id: data.user_id,
		surveys: {
			title: data.title,
			description: data.description
		},
		surveysQuestion: data.questions.map(question => ({
			index: question.index,
			type: question.type,
			title: question.title,
			firstLabel: question.firstLabel,
			lastLabel: question.lastLabel,
			image: question.image_link,
			required: question.required,
			surveysQuestionOption: question.options.map(option => ({
				index: option.index,
				title: option.value
			}))
		}))
	};
};

export const transformDataToServerFormatUpdate = data => {
	return {
		title: data.title,
		description: data.description,
		type: data.type,
		surveysQuestion: data.questions.map(question => ({
			index: question.index,
			id: question.id,
			type: question.type,
			title: question.title,
			firstLabel: question.firstLabel,
			lastLabel: question.lastLabel,
			image: question.image_link,
			required: question.required,
			surveysQuestionOption: question.options.map(option => ({
				index: option.index,
				id: option.id,
				title: option.value
			}))
		})),
		user: data.user
	};
};

const sortObjectsByIndex = objs => objs.sort((a, b) => (a.index > b.index) ? 1 : ((b.index > a.index) ? -1 : 0)); 

export const setArrangementInSurveys = data => {
	data.map(survey => {
		survey.surveysQuestion = sortObjectsByIndex(survey.surveysQuestion).map(question => {
			question.surveysQuestionOption = sortObjectsByIndex(question.surveysQuestionOption);
			return question;
		});
		return survey;
	});
	return data;
}
