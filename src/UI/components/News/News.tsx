import React from "react";
import classes from "./News.module.css";
import {useSelector} from "react-redux";
import {InitialStateType} from "../../../BLL/reducers/news-reducer";
import {RootReducersType} from "../../../BLL/store";
import {Search} from "../../common/Search/Search";

export const News = () => {

	const allNews = useSelector<RootReducersType, InitialStateType>(state => state.news);

	const news = allNews.map(n => {
		return (
			<div className={classes.news} key={n.id}>
				<h2 className={classes.title}>{n.title}</h2>
				<p className={classes.text}>
					{n.text}
				</p>
				<span>
					{n.date}
				</span>
			</div>
		)
	})

	return (
		<>
			<Search/>
			{news}
		</>
	)
}
