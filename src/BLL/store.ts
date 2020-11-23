import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware from 'redux-thunk';
import {AppReducer} from "./reducers/app-reducer";
import {NewsReducer} from "./reducers/news-reducer";


const reducers = combineReducers({
	app: AppReducer,
	news: NewsReducer
})

export type RootReducersType = ReturnType<typeof reducers>
export const store = createStore(reducers, applyMiddleware(thunkMiddleware))
