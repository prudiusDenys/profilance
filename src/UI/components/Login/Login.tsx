import React from "react";
import {
	Button,
	Checkbox,
	createStyles,
	FormControl,
	FormControlLabel,
	FormGroup,
	Grid,
	Paper,
	TextField,
	Theme
} from "@material-ui/core";
import {useFormik} from "formik";
import {makeStyles} from "@material-ui/core/styles";
import {useDispatch} from "react-redux";
import {setRegistered, setUserData, showLogin} from "../../../BLL/reducers/app-reducer";


export type LoginDataType = {
	login: string,
	password: string,
	rememberMe: boolean
}

type LoginErrorType = {
	login?: string,
	password?: string,
	rememberMe?: boolean
}

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		gridItem: {
			position: 'relative',
			zIndex: 1,
			maxWidth: '400px',
			width: '100%',
			padding: '0 10px'
		},
		formControl: {
			width: '100%'
		},
		container: {
			marginTop: '60px',
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center'
		},
		formLabel: {
			margin: '0 0 10px 0'
		},
		inputBox: {
			position: 'relative',
			width: '100%'
		},
		errMessage: {
			position: 'absolute',
			bottom: '6px',
			left: '0',
			color: '#d82626',

		},
		button: {
			margin: '0 0 10px 0'
		},
		disable: {
			opacity: 0.5,
			pointerEvents: 'none'
		},
		enable: {
			opacity: 1,
			pointerEvents: 'inherit'
		}
	}),
)

export const Login = React.memo(() => {

	const dispatch = useDispatch()
	const styles = useStyles()
	// const dispatch = useDispatch()
	// const isSignIn = useSelector<rootReducers, boolean>(state => state.login.isSignIn)
	// const success = useSelector<rootReducers, boolean>(state => state.app.success)

	const formik = useFormik({
		initialValues: {
			login: '',
			password: '',
			rememberMe: false
		},
		validate: (values: LoginDataType) => {
			const errors: LoginErrorType = {};
			if (!values.login) {
				errors.login = 'Поле обязательно';
			} else if (values.login.length < 3) {
				errors.login = 'Login должен быть больше 3 символов';
			} else if (!values.password) {
				errors.password = 'Поле обязательно';
			} else if (values.password.length < 8) {
				errors.password = 'Введите больше 8 символов';
			}
			return errors
		},
		onSubmit: (values, {resetForm}) => {
			dispatch(setUserData(values))
			dispatch(showLogin(false))
			dispatch(setRegistered(true))
			resetForm();
		},
	})

	const onCloseHandler = () => {
		dispatch(showLogin(false))
	}
	// if (isSignIn) return <Redirect to={'/'}/>

	return (
		<div>
			<Grid container className={styles.container}>
				<Grid item className={`${styles.gridItem} ${styles.enable}`}>
					{/*{!success && <Spinner/>}*/}
					<Paper elevation={3} style={{padding: '30px'}}>
						<h2 style={{textAlign: "center", margin: '0 0 30px 0'}}>Форма входа</h2>
						<form onSubmit={formik.handleSubmit}>
							<FormControl className={styles.formControl}>
								<FormGroup>
									<div className={styles.inputBox}>
										<TextField style={{width: '100%', paddingBottom: '30px'}}
															 type={'text'}
															 label={'Login'}
															 variant={"outlined"}
															 error={formik.errors.login ? true : undefined}
															 {...formik.getFieldProps('login')}/>
										{formik.errors.login && <div className={styles.errMessage}>{formik.errors.login}</div>}
									</div>
									<div className={styles.inputBox}>
										<TextField style={{width: '100%', paddingBottom: '30px'}}
															 type={'password'}
															 label={'Password'}
															 variant={"outlined"}
															 error={formik.errors.password ? true : undefined}
															 {...formik.getFieldProps('password')}/>
										{formik.errors.password && <div className={styles.errMessage}>{formik.errors.password}</div>}
									</div>
									<FormControlLabel className={styles.formLabel} label={'Запомнить меня'}
																		control={
																			// Get all props from checkbox
																			// checked value must be taken from formik
																			<Checkbox color={'primary'}
																								checked={formik.values.rememberMe}
																								{...formik.getFieldProps('rememberMe')}/>
																		}
									/>
									<Button className={styles.button}
													type={'submit'}
													variant={'contained'}
													color={'primary'}>Войти
									</Button>
									<Button onClick={onCloseHandler} className={styles.button}
													type={'submit'}
													variant={'contained'}>закрыть
									</Button>
								</FormGroup>
							</FormControl>
						</form>
					</Paper>
				</Grid>
			</Grid>
		</div>
	)
})
