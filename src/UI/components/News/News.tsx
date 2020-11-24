import React, {ChangeEvent} from "react";
import classes from "./News.module.css";
import {useDispatch, useSelector} from "react-redux";
import {NewsType} from "../../../BLL/reducers/news-reducer";
import {RootReducersType} from "../../../BLL/store";
import {TextField} from "@material-ui/core";
import {setSearchValue} from "../../../BLL/reducers/app-reducer";

export const News = () => {

	let allNews = useSelector<RootReducersType, Array<NewsType>>(state => state.news.news);
	const searchValue = useSelector<RootReducersType, string>(state => state.app.searchValue)
	const dispatch = useDispatch();

	const onChangeHandler = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
		dispatch(setSearchValue(e.currentTarget.value))
	}

	if (searchValue.length > 0) {
		allNews = allNews.filter(n => {
			return n.title.toLowerCase().match(searchValue.toLowerCase())
		})
	}

	const news = allNews.map(n => {
		return (
			<div className={classes.news} key={n.id}>
				<h2 className={classes.title}>{n.title}</h2>
				<p className={classes.text}>
					{n.text}
				</p>
				<span className={classes.date}>
					{n.date}
				</span>
			</div>
		)
	})

	return (
		<>
			<div className={classes.search}>
				<TextField placeholder={'search...'} variant={"standard"} value={searchValue} onChange={onChangeHandler}/>
			</div>
			{news}
		</>
	)
}
