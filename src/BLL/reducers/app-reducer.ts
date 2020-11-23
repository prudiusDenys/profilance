import {LoginDataType} from "../../UI/components/Login/Login";

const initialState = {
	isSignIn: false,
	showLogin: false,
	userData: {
		login: '',
		password: '',
		rememberMe: false
	},
	searchValue: ''
}

export const AppReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
	switch (action.type) {
		case "APP/SHOW_LOGIN": {
			return {...state, showLogin: action.value}
		}
		case "APP/GET_USER_DATA": {
			return {...state, userData: {...state.userData, ...action.userData}}
		}
		case "APP/SET_REGISTERED": {
			return {...state, isSignIn: action.value}
		}
		case "APP/SET_SEARCH_VALUE":{
			return {...state, searchValue: action.value}
		}
		default:
			return state
	}
}


//actions
export const showLogin = (value: boolean) => {
	return {type: 'APP/SHOW_LOGIN', value} as const
}
export const setUserData = (userData: LoginDataType) => {
	return {type: 'APP/GET_USER_DATA', userData} as const
}
export const setRegistered = (value: boolean) => {
	return {type: 'APP/SET_REGISTERED', value} as const
}
export const setSearchValue = (value: string) => {
	return {type: 'APP/SET_SEARCH_VALUE', value} as const
}

//types
type InitialStateType = typeof initialState
type ActionsType = ReturnType<typeof showLogin>
	| ReturnType<typeof setUserData>
	| ReturnType<typeof setRegistered>
	| ReturnType<typeof setSearchValue>
