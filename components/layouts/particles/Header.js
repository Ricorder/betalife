import { useEffect, useState } from 'react'
import { useSwipeable } from 'react-swipeable'

import useStore from 'core/store'
import menu from 'core/context/menu'
import { Link } from 'components/common'
import SearchDrawer from './SearchDrawer'
import NavDrawer from './NavDrawer'

const HeaderNav = (props) => {
	return (
		<div className="menu">
			<ul className="row">
				{menu
					.filter((a) => a.menu.includes('main'))
					.map((item, i) => (
						<li key={i}>
							<Link {...item.link}>
								<a title={item.name}>{item.name}</a>
							</Link>
						</li>
					))}
			</ul>
		</div>
	)
}

const Header = () => {
	const { swipeSlider, setSwipeSlider } = useStore()
	const [values, setValues] = useState({ nav: false, search: false })
	const { nav, search } = values

	const onToggle = (name) => (e) => {
		if (values.hasOwnProperty(name)) {
			e.target.classList.toggle('active')
			setValues({ ...values, [name]: !values[name] })
		}
	}

	// Swipe
	const { ref } = useSwipeable({
		onSwipedLeft: () => {
			!swipeSlider && setValues({ ...values, nav: true })
			setSwipeSlider(false)
		},
		onSwipedRight: () => setValues({ ...values, nav: false })
	})

	useEffect(() => {
		ref(document)
	})

	return (
		<>
			<header className="header">
				<div className="topbar">
					<div className="container-inner row">
						<div className="row applinks">
							<a
								href="https://play.google.com/store/apps/details?id=com.betalife"
								className="button-app googleplay"
								rel="noreferrer noopener"
								aria-label="Google Play"
								target="_blank"
							/>
							<a
								href="https://apps.apple.com/ua/app/betalife/id1507787822?l=ru"
								className="button-app applestore"
								rel="noreferrer noopener"
								aria-label="Apple Store"
								target="_blank"
							/>
							<Link href="/services/app">
								<a className="link">Скачай наше приложение в Google play и Appstore</a>
							</Link>
						</div>

						<div className="buttons">
							<Link href="/vosproizvedennye-pitrs">
								<a className="button bl">ВОСПРОИЗВЕДЕННЫЕ ПИТРС</a>
							</Link>
							{/* <Link href="/konkurs"><a className="button bl">Конкурс</a></Link> */}
						</div>
					</div>
				</div>

				<div className="middle">
					<div className="container-inner row">
						<Link href="/" aria-label="BETALIFE">
							<a className="logo" />
						</Link>

						<HeaderNav />

						<div className="row drwnav">
							<button className={`button bl toggle-nav ${nav ? 'active' : ''}`} onClick={onToggle('nav')} aria-label="Меню (скрыть/показать)">
								<i />
							</button>
							<button className={`button bl toggle-search ${search ? 'active' : ''}`} onClick={onToggle('search')} aria-label="Поиск (скрыть/показать)" />
						</div>
					</div>
				</div>
			</header>

			<SearchDrawer visible={search} close={onToggle('search')} />

			<NavDrawer visible={nav} close={onToggle('nav')} list={menu} />
		</>
	)
}

export default Header
