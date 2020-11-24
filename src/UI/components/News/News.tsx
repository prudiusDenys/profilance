import React, {ChangeEvent, useState} from "react";
import classes from "./News.module.css";
import {useDispatch, useSelector} from "react-redux";
import {NewsType, setNews} from "../../../BLL/reducers/news-reducer";
import {RootReducersType} from "../../../BLL/store";
import {Button, TextField} from "@material-ui/core";
import {setSearchValue} from "../../../BLL/reducers/app-reducer";
import {AddNewNews} from "./AddNewNews/AddNewNews";
import {Redirect} from "react-router-dom";

export const News = () => {

	let allNews = useSelector<RootReducersType, Array<NewsType>>(state => state.news.news);
	const searchValue = useSelector<RootReducersType, string>(state => state.app.searchValue)
	const isSignIn = useSelector<RootReducersType, boolean>(state => state.app.isSignIn)
	const isAdmin = useSelector<RootReducersType, boolean>(state => state.app.userData.isAdmin)
	const isShowLogin = useSelector<RootReducersType, boolean>(state => state.app.showLogin)
	const dispatch = useDispatch();

	const [textMode, setTextMode] = useState(false)

	const onChangeHandler = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
		dispatch(setSearchValue(e.currentTarget.value))
	}

	const onClickHandler = () => setTextMode(true)
	const removeNews = (id: string) => {
		const filteredNews = allNews.filter(n => n.id !== id)
		dispatch(setNews(filteredNews))
	}
	const approveNews = (id: string) => {
		if (!isAdmin) {
			return
		}
		const approvedNewsAll = allNews.map(n => {
			if (n.id === id) {
				return {...n, approvedNews: true}
			}
			return n
		})
		dispatch(setNews(approvedNewsAll))
	}


	if (searchValue.length > 0) {
		allNews = allNews.filter(n => {
			return n.title.toLowerCase().match(searchValue.toLowerCase())
		})
	}

	if (!isSignIn) {
		allNews = allNews.filter(n => n.approvedNews)
	}
	if (isShowLogin) {
		return <Redirect to={'/'}/>
	}

	const news = allNews.map(n => {
		return (
			<div className={classes.news} key={n.id}>
				<h2 className={classes.title}>{n.title}</h2>
				<p className={classes.text}>
					{n.text}
				</p>
				<div className={classes.textFooter}>
					<span className={classes.date}>
					{n.date}
				</span>
					{
						n.approvedNews ? <span>Одобрено админом</span>
							:
							<span className={classes.unapprovedArticle} onClick={() => approveNews(n.id)} style={{color: 'red'}}>
								Статья на рассмотрении
								{isAdmin && <span className={classes.approveArticle}>
									Одобрить Статью ? кликните по статье.
								</span>}
							</span>
					}
				</div>
				{isSignIn && isAdmin &&
        <Button onClick={() => removeNews(n.id)} style={{marginTop: '30px'}} color={"secondary"}>Удалить
          статью</Button>}
			</div>
		)
	})

	return (
		<>
			{
				!textMode ?
					<>
						<div className={classes.search}>
							<TextField placeholder={'search...'} variant={"standard"} value={searchValue} onChange={onChangeHandler}/>
							{isSignIn &&
              <Button variant={"outlined"} color={"primary"} onClick={onClickHandler}> Добавить новость</Button>}
						</div>
						{news}
					</>
					:
					<AddNewNews closeAddingPage={setTextMode}/>
			}
		</>
	)
}
