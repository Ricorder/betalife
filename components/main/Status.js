import { Link, Section } from 'components/common'

const Status = (props) => {
	const statuses = [
		{ id: '617b8bbac5ddfa5dcabcd142', name: `Подозрение на РС`, classes: 'ms-suspected', link: { href: '/status/[tag]', as: `/status/podozrenie-na-rs` } },
		{ id: '617b8ba4c5ddfa5dcabcd0ef', name: `Поставлен диагноз`, classes: 'diagnosed', link: { href: '/status/[tag]', as: `/status/diagnostirovan-rs` } },
		{ id: '617b8bacc5ddfa5dcabcd0fe', name: `Назначили терапию`, classes: 'therapy', link: { href: '/status/[tag]', as: `/status/naznachili-terapiyu` } },
		{ id: '617b8bb3c5ddfa5dcabcd12c', name: `Пациент со стажем`, classes: 'experience', link: { href: '/status/[tag]', as: `/status/pacient-so-stazhem` } },
		{ id: '617b8bc7c5ddfa5dcabcd151', name: `У моего ребенка РС`, classes: 'children', link: { href: '/status/[tag]', as: `/status/u-rebenka-rs` } },
		{ id: '617b8b97c5ddfa5dcabcd0e5', name: `Близкий больного`, classes: 'close-patient', link: { href: '/status/[tag]', as: `/status/blizkij-bolnogo` } }
	]

	return (
		<Section className="main-status">
			<div className="pattern" />

			<div className="flex row status">
				<div className="flex column desc">
					<h2>Укажите отношение к болезни,</h2>
					<p>чтобы получить наиболее интересные материалы:</p>
				</div>
				<div className="flex column list">
					<ul className="flex">
						{statuses &&
							statuses.map((item) => (
								<li key={item.id}>
									<div className="inner">
										<Link {...item.link}>
											<a className={item.classes}>{item.name}</a>
										</Link>
									</div>
								</li>
							))}
					</ul>
				</div>
			</div>
		</Section>
	)
}

export default Status
