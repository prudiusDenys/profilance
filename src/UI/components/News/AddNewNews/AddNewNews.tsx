import React from "react";
import {Button, createStyles, FormControl, FormGroup, Grid, Paper, TextField, Theme} from "@material-ui/core";
import {useFormik} from "formik";
import {makeStyles} from "@material-ui/core/styles";
import {useDispatch} from "react-redux";
import {getDate} from "../../../../functions/functions";
import {v1} from "uuid";
import {setNewNews} from "../../../../BLL/reducers/news-reducer";


export type TextDataType = {
	title: string,
	text: string,
}

type TextErrorType = {
	title?: string,
	text?: string,
}

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		gridItem: {
			position: 'relative',
			zIndex: 1,
			maxWidth: '800px',
			width: '100%',
			padding: '0 10px'
		},
		formControl: {
			width: '100%',
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
			width: '100%',
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

type PropsType = {
	closeAddingPage: (value: boolean) => void
}

export const AddNewNews = React.memo((props: PropsType) => {

	const dispatch = useDispatch()
	const styles = useStyles()

	const formik = useFormik({
		initialValues: {
			title: '',
			text: '',
		},
		validate: (values: TextDataType) => {
			const errors: TextErrorType = {};
			if (!values.title) {
				errors.title = 'Поле обязательно';
			} else if (values.title.length < 3) {
				errors.title = 'Заголовок должен быть больше 3 символов';
			} else if (!values.text) {
				errors.text = 'Поле обязательно';
			}
			return errors
		},
		onSubmit: (values, {resetForm}) => {
			const newNews = {id: v1(), title: values.title, text: values.text, approvedNews: false, date: getDate()}
			dispatch(setNewNews(newNews))
			props.closeAddingPage(false)
			resetForm();
		},
	})

	return (
		<div>
			<Grid container className={styles.container}>
				<Grid item className={`${styles.gridItem} ${styles.enable}`}>
					<Paper elevation={3} style={{padding: '30px'}}>
						<h2 style={{textAlign: "center", margin: '0 0 30px 0'}}>Напишите Вашу статью</h2>
						<form onSubmit={formik.handleSubmit}>
							<FormControl className={styles.formControl}>
								<FormGroup>
									<div className={styles.inputBox}>
										<TextField style={{width: '100%', paddingBottom: '30px'}}
															 type={'text'}
															 label={'Заголовок'}
															 variant={"outlined"}
															 error={formik.errors.title ? true : undefined}
															 {...formik.getFieldProps('title')}/>
										{formik.errors.title && <div className={styles.errMessage}>{formik.errors.title}</div>}
									</div>
									<div className={styles.inputBox}>
										<TextField style={{width: '100%', height: '100%', paddingBottom: '30px'}}
															 multiline
															 rowsMax={30}
															 rows={15}
															 label={'Текст статьи'}
															 variant={"outlined"}
															 error={formik.errors.text ? true : undefined}
															 {...formik.getFieldProps('text')}/>
										{formik.errors.text && <div className={styles.errMessage}>{formik.errors.text}</div>}
									</div>
									<Button className={styles.button}
													type={'submit'}
													variant={'contained'}
													color={'primary'}>Отправить
									</Button>
									<Button onClick={props.closeAddingPage.bind(null, false)} className={styles.button}
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
