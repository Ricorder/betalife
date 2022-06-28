import { useEffect, useRef, useState } from 'react'
import { Link } from 'components/common'

import useAction from 'core/api'

const termtypes = [
	{ key: 'pages', name: 'Страницы' },
	{ key: 'posts', name: 'Статьи' },
	{ key: 'events', name: 'Лектории' },
	{ key: 'statuses', name: 'Статусы' },
	{ key: 'experts', name: 'Эксперты' },
	{ key: 'glossary', name: 'Словарь' },
	{ key: 'locations', name: 'Мед.учреждения' },
	{ key: 'question-answer', name: 'Вопросы & Ответы' }
]

import { Badge, Drawer, Tabs } from 'antd'
const { TabPane } = Tabs

const SearchDrawer = ({ visible, close }) => {
	const searchInput = useRef(null)
	const [values, setValues] = useState({ search: '', message: '', posts: [], pages: [], total: { all: 0, pages: 0, posts: 0 } })

	const { search, posts, pages, total, message } = values

	useEffect(() => {
		const timeout = setTimeout(function () {
			if (search.length === 0) {
				onReset()
			} else {
				loadFinder()
			}
		}, 500)

		return () => clearTimeout(timeout)
	}, [search])

	const loadFinder = async () => {
		await useAction.get(`search`, { search }).then((data) => {
			if (!data || data?.error) return
			const result = data?.total?.all === 0 && 'По вашему запросу ничего не найдено'
			setValues({ ...values, search, ...data, message: result })
		})
	}

	const onChange = (e) => setValues({ ...values, search: e.target.value, message: '' })

	const onReset = () => {
		setValues({ search: '', message: '', posts: [], pages: [], total: { all: 0, pages: 0, posts: 0 } })
	}

	const searchSubmit = (e) => {
		e.preventDefault()
		loadFinder()
	}

	const searchForm = () => (
		<form className="searchbar" onSubmit={searchSubmit}>
			<input type="search" ref={searchInput} className="inp icon" placeholder="Поиск по сайту..." value={search} onChange={onChange} />
			{search && search.length > 0 && <div className="clear" onClick={onReset}></div>}
		</form>
	)

	// const renderResult = (list = [], type = 'page') => {
	// 	if (!list && !list.length) return

	// 	let title = type == 'post' ? 'Найдено постов:' : 'Найдено записей:'
	// 	let typeSlug = type == 'post' ? 'posts' : 'pages'

	// 	return (
	// 		<div className="result-list">
	// 			<div className="total">
	// 				{title} <b>{list.length}</b>
	// 			</div>
	// 			{list.map((item, i) => (
	// 				<div key={i} className="item">
	// 					{type === 'page' ? (
	// 						<Link href={`/user-agreement/[slug]`} as={`/user-agreement/${item.slug}`}>
	// 							<a onClick={onReset}>{item.title}</a>
	// 						</Link>
	// 					) : (
	// 						<Link href={`/[taxonomy]/[slug]`} as={`/category/${item?.categories[0].slug}/${item.slug}`}>
	// 							<a onClick={onReset}>{item.title}</a>
	// 						</Link>
	// 					)}
	// 				</div>
	// 			))}
	// 		</div>
	// 	)
	// }

	const renderResult = (list = [], type = 'pages') => {
		let title = `Найдено страниц:`

		if (type == 'posts') {
			title = `Найдено постов:`
		}
		//  else if (type == 'questions') {
		// 	title = `Найдено ответов:`
		// } else if (type == 'stories') {
		// 	title = `Найдено историй:`
		// }
		return (
			list?.length > 0 && (
				<div className="result-list">
					{/* <div className="total">{title} <b>{list.length}</b></div> */}
					{list.map((item, i) => {
						return (
							<div key={i} className="item">
								{type === 'experts' ? (
									<Link href="/experts/[expert]" as={`/experts/${item.slug}`}>
										<a onClick={onReset}>{item.title}</a>
									</Link>
								) : type === 'posts' ? (
									<Link href="/[taxonomy]/[slug]" as={`/${item?.categories[0].slug}/${item.slug}`}>
										<a onClick={onReset}>{item.title}</a>
									</Link>
								) : type === 'qa' ? (
									<Link href="/question-answer/[taxonomy]/[post]" as={`/question-answer/${item.slug}`}>
										<a onClick={onReset}>{item.title}</a>
									</Link>
								) : (
									<Link href={`/${item.slug}`}>
										<a onClick={onReset}>{item.title}</a>
									</Link>
								)}
							</div>
						)
					})}
				</div>
			)
		)
	}

	return (
		<Drawer closable width={false} footer={null} visible={visible} getContainer={true} placement="right" onClose={close} title={searchForm()} className="drawer-search">
			{total?.all === 0 && (
				<div className="empty">
					<div className="center">
						{/* <p>Результаты поиска</p> */}
						{message && <div className="message">{message}</div>}
					</div>
				</div>
			)}

			{total?.all > 0 && (
				<div className="search-result">
					<Tabs className="search-tabs">
						{termtypes
							?.filter((a) => typeof values[a.key] !== 'undefined')
							.map((a) => (
								<TabPane
									key={a.key}
									tab={
										<>
											{a.name} <span className="count">{values[a.key].length}</span>
										</>
									}>
									{renderResult(values[a.key], a.key)}
								</TabPane>
							))}
					</Tabs>
				</div>
			)}
		</Drawer>
	)
}

export default SearchDrawer
