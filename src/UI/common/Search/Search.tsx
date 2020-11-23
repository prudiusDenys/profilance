import React, {ChangeEvent} from "react";
import classes from "./Search.module.css";
import {TextField} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {RootReducersType} from "../../../BLL/store";
import {setSearchValue} from "../../../BLL/reducers/app-reducer";

export const Search = () => {

	const searchValue = useSelector<RootReducersType, string>(state => state.app.searchValue)
	const dispatch = useDispatch()

	console.log(searchValue)

	const onChangeHandler = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
		dispatch(setSearchValue(e.currentTarget.value))
	}

	return(
		<div className={classes.search}>
			<TextField placeholder={'search...'} variant={"standard"} value={searchValue} onChange={onChangeHandler}/>
		</div>
	)
}
