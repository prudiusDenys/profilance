import {Button} from "@material-ui/core";
import React from "react";
import {NavLink} from "react-router-dom";
import classes from "./MainLayout.module.css";
import containerStyle from '../styles/container.module.css'
import {useDispatch, useSelector} from "react-redux";
import {RootReducersType} from "../../../BLL/store";
import {setRegistered, showLogin} from "../../../BLL/reducers/app-reducer";

export const MainLayout = ({children}: any) => {

	const isSignIn = useSelector<RootReducersType, boolean>(state => state.app.isSignIn)
	const dispatch = useDispatch()

	const logInHandler = () => dispatch(showLogin(true))
	const logOutHandler = () => dispatch(setRegistered(false))

	return (
		<div>
			<div className={containerStyle.container}>
				<div className={classes.header}>
					<nav className={classes.nav}>
						<ul className={classes.list}>
							<NavLink className={classes.link} to={'/'}>Главная</NavLink>
							<NavLink className={classes.link} to={'/news'}>Новости</NavLink>
						</ul>
					</nav>
					{
						!isSignIn ? <Button variant={'contained'} color={'primary'} onClick={logInHandler}>Вход</Button>
							: <Button variant={'contained'}
												color={'secondary'} onClick={logOutHandler}>Выход</Button>
					}
				</div>
				<main className={classes.mainContent}>
					{children}
				</main>
			</div>
		</div>
	)
}
