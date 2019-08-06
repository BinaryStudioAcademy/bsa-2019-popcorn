declare module "redux-saga-routines"

interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
}

function combineReducers<S>(reducers: ReducersMapObject): Reducer<S>;