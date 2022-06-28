import { useEffect, useRef, useState } from 'react'
import { Link, Modal, Drawer } from '.'
import useAction from 'core/api'
import { Tabs } from 'antd'
const { TabPane } = Tabs

const InlineSearch = ({ searchform, result, ...props }) => {
	return (
		<div className="search inline">
			{searchform && searchform()}
			{result && result()}
		</div>
	)
}

const Search = ({ type = 'drawer', visible, close, ...props }) => {
	const searchInput = useRef(null)
	const [values, setValues] = useState({ search: '', message: '', posts: [], pages: [], total: { all: 0, pages: 0, posts: 0 } })

	const { search, posts, pages, total, message } = values

	useEffect(() => {
		const timeout = setTimeout(() => (search?.length === 0 ? onReset() : loadFinder()), 500)
		return () => clearTimeout(timeout)
	}, [search])

	const loadFinder = async () => {
		await useAction
			.get(`search`, { search })
			.then((data) => data && !data?.error && setValues({ ...values, search, ...data, message: data?.total?.all === 0 && 'По вашему запросу ничего не найдено' }))
	}

	const onChange = (e) => setValues({ ...values, search: e.target.value, message: '' })

	const onReset = () => setValues({ search: '', message: '', posts: [], pages: [], total: { all: 0, pages: 0, posts: 0 } })

	const searchSubmit = (e) => {
		e.preventDefault()
		loadFinder()
	}

	const SearchForm = () => (
		<form className="searchbar" onSubmit={searchSubmit}>
			<input type="search" ref={searchInput} className="inp" placeholder="Поиск по сайту..." value={search} onChange={onChange} />
			{total && total.all > 0 && <div className="clear" onClick={onReset}></div>}
		</form>
	)

	const getResultGroup = (list = [], type = 'page') => {
		if (!list && !list.length) return

		let title = type == 'post' ? 'Найдено постов:' : 'Найдено записей:'
		let typeSlug = type == 'post' ? 'posts' : 'pages'

		return (
			<div className="result-list">
				<div className="total">
					{title} <b>{list.length}</b>
				</div>
				{list.map((item, i) => {
					const category = {
						href: '/[taxonomy]/[post]',
						as: item?.categories?.length > 0 && `/${item?.categories[0].slug}/${item.slug}`
					}
					return (
						<div key={i} className="item">
							{type === 'page' ? (
								<Link href={`/${item.slug}`}>
									<a onClick={close}>{item.title}</a>
								</Link>
							) : (
								<Link {...category}>
									<a onClick={close}>{item.title}</a>
								</Link>
							)}
						</div>
					)
				})}
			</div>
		)
	}

	const showResult = () => {
		return (
			<>
				{total && total.all === 0 && (
					<div className="empty">
						<div className="center">
							{/* <p>Результаты поиска</p> */}
							{message && <div className="message">{message}</div>}
						</div>
					</div>
				)}
				{total && total.all > 0 && (
					<div className="search-result">
						<Tabs>
							{total.posts && (
								<TabPane tab={`Статьи (${posts.length})`} key="posts">
									{getResultGroup(posts, 'post')}
								</TabPane>
							)}
							{total.pages && (
								<TabPane tab={`Страницы (${pages.length})`} key="pages">
									{getResultGroup(pages, 'page')}
								</TabPane>
							)}
						</Tabs>
					</div>
				)}
			</>
		)
	}

	return type === 'modal' ? (
		<Modal visible={visible} onCancel={close}>
			{SearchForm()}
			{showResult()}
		</Modal>
	) : type === 'drawer' ? (
		<Drawer className="drawer-search" visible={visible} onClose={close} title={<SearchForm />}>
			{showResult()}
		</Drawer>
	) : (
		<InlineSearch searchform={SearchForm} result={showResult}></InlineSearch>
	)
}

export default Search
