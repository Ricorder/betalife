import { useEffect, useState } from 'react'

import useAction from 'core/api'
import useStore from 'core/store'
import { Link, Section } from 'components/common'

const Statuses = (props) => {
	const { store, setStore } = useStore()
	const { statusbar, statuses, curstatus } = store
	const [visible, setVisible] = useState(false)

	useEffect(() => {
		loadData()
	}, [])

	const loadData = async () => {
		if (!statuses.length) {
			await useAction.get('taxonomies', { type: 'tag', term_slug: 'statuses' }).then((data) => {
				if (!data.error) {
					setStore({ ...store, statuses: data })
				} else {
					setStore({ ...store, statusbar: false, statuses: [] })
				}
			})
		}
	}

	// const statuses = [
	// 	{ id: '617b8bbac5ddfa5dcabcd142', name: `Подозрение <br />на РС`, link: { href: '/status/[tag]', as: `/status/podozrenie-na-rs` } },
	// 	{ id: '617b8ba4c5ddfa5dcabcd0ef', name: `Поставлен <br />диагноз`, link: { href: '/status/[tag]', as: `/status/diagnostirovan-rs` } },
	// 	{ id: '617b8bacc5ddfa5dcabcd0fe', name: `Назначили <br />терапию`, link: { href: '/status/[tag]', as: `/status/naznachili-terapiyu` } },
	// 	{ id: '617b8bb3c5ddfa5dcabcd12c', name: `Пациент <br />со стажем`, link: { href: '/status/[tag]', as: `/status/patsient-so-stazhem` } },
	// 	{ id: '617b8bc7c5ddfa5dcabcd151', name: `У моего <br />ребенка РС`, link: { href: '/status/[tag]', as: `/status/u-rebenka-rs` } },
	// 	{ id: '617b8b97c5ddfa5dcabcd0e5', name: `Близкий <br />больного`, link: { href: '/status/[tag]', as: `/status/blizkij-bolnogo-rs` } }
	// ]

	return (
		statusbar && (
			<Section className="statuses">
				<div className="list">
					<span className={`toggle ${visible ? 'active' : ''}`} onClick={() => setVisible(!visible)}>
						Выберите статус
					</span>
					<ul className={`row ${visible ? 'active' : ''}`}>
						{statuses?.map((s, i) => (
							<li key={s._id}>
								<Link href="/status/[tag]" as={`/status/${s.slug}`}>
									<a className={`s${i + 1} ps ${curstatus === s._id ? 'active' : ''}`}>
										<span dangerouslySetInnerHTML={{ __html: s.name }} />
									</a>
								</Link>
							</li>
						))}
					</ul>
				</div>
			</Section>
		)
	)
}

export default Statuses
