import {
	SET_RECOMMENDED,
	SET_RECOMMENDED_REACTION_SUCCESS
} from './actionTypes';

const initialState: { recommended: any } = {
	recommended: null
};

export default function(state = initialState, action) {
	switch (action.type) {
		case SET_RECOMMENDED:
			return {
				...state,
				recommended: action.payload
			};
		case SET_RECOMMENDED_REACTION_SUCCESS:
			let newReview = state.recommended.reviews.review[0];
			newReview.reaction = action.payload.updatedReaction;
			return {
				...state,
				recommended: {
					...state.recommended,
					reviews: {
						...state.recommended.reviews,
						review: [newReview]
					}
				}
			};
		default:
			return state;
	}
}
