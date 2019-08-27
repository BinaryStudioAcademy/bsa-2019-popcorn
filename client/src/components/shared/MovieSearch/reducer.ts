interface IState {
	searchData?: Array<IMovieTitles>;
}

interface IMovieTitles {
	id: string;
	title: string;
}

const initialState = {
	searchData: ['kek']
};

export default (state = initialState, action) => {
	switch (action.type) {
		default:
			return state;
	}
};
