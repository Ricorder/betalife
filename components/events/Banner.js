import { Section, Countdown, Link } from 'components/common'

import { dateformat } from 'core/utils/general'

const EventBanner = ({ single = false, slug, title, excerpt, fields }) => {
	const date = dateformat(fields.date, '[<span>]Вебинар:[</span>] DD MMMM YYYY [<span>] | [</span>] Начало: HH:mm')
	return (
		<Section className="pagehead event-pagehead">
			<div className="row banner">
				<div className="column">
					<div className="picture" />
					<h1>
						Лекторий <span>для пациентов</span>
					</h1>
				</div>

				<div className="content">
					{/* {fields?.date && <Countdown date={fields.date} />} */}
					{fields?.date && <p className="date" dangerouslySetInnerHTML={{ __html: date }} />}

					<h2>{title}</h2>
					{fields?.desc && <p className="desc" dangerouslySetInnerHTML={{ __html: fields?.desc }} />}

					{single ? (
						<a href="#signup" className="button">
							Регистрация
						</a>
					) : (
						<Link href="/events/[event]" as={`/events/${slug}`}>
							<a className="button">Регистрация</a>
						</Link>
					)}
				</div>
			</div>
		</Section>
	)
}

export default EventBanner
