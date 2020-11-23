import React, {useState} from "react";
import classes from "./Home.module.css";
import {useSelector} from "react-redux";
import {RootReducersType} from "../../../BLL/store";
import {Login} from "../Login/Login";

export const Home = () => {


	const isSignIn = useSelector<RootReducersType, boolean>(state => state.app.isSignIn)
	const showLogin = useSelector<RootReducersType, boolean>(state => state.app.showLogin)
	const login = useSelector<RootReducersType, string>(state => state.app.userData.login)

	return (
		<div className={classes.home}>
			{
				!isSignIn ?
					<h1 className={classes.title}>Привет Гость</h1>
					:
					<h1 className={classes.title}>Привет {login}</h1>
			}
			{
				showLogin && <Login/>
			}
		</div>
	)
}
