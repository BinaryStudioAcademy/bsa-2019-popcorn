interface IReducer {
	watchList: Array<any>;
}

const initialState: IReducer = {
	watchList: []
};

export default (state = initialState, action) => {
	switch (action.type) {
		default:
			return state;
	}
};
