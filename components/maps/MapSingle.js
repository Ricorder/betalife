import { Drawer } from 'antd'

const MapSingle = ({ visible, cities, onChange, onClose, data }) => {
	if (!data?.fields) return <></>

	const {
		fields: { type, doctor, address, site, phones, email, city, schedule, representative }
	} = data

	const showSchedule = () => {
		if (!schedule.length) return
		const cdate = new Date()
		const cday = cdate.getDay() - 1
		const chour = cdate.getHours()
		const stoday = schedule && typeof schedule[cday] !== 'undefined' && schedule[cday]
		const status = () => {
			if (stoday.from && stoday.to) {
				return chour >= stoday.from.slice(0, 2) && chour <= stoday.to.slice(0, 2) ? <small className="green">сейчас открыто</small> : <small className="red">сейчас закрыто</small>
			}
		}

		return (
			<p className="schedule">
				<b>Время работы:</b>
				<span>
					{stoday.from && stoday.to ? `Сегодня с ${stoday.from} до ${stoday.to}` : `Сегодня закрыто`}
					{status()}
				</span>
			</p>
		)
	}

	return (
		<Drawer width={false} placement="right" closable onClose={onClose} visible={visible} className="drawer-location">
			<div className="single">
				{data.title && <h2>{data.title}</h2>}
				{type && (
					<p className="type">
						<b>Тип:</b>
						{type == 1 ? 'Бюджетное' : 'Пациентские организации'}
					</p>
				)}
				{doctor && (
					<p className="doctor">
						<b>Врач:</b>
						{doctor}
					</p>
				)}
				{representative && (
					<p className="doctor">
						<b>Представитель:</b> {representative}
					</p>
				)}
				{address && (
					<p className="address">
						<b>Адрес:</b>
						{address}
					</p>
				)}
				{site && (
					<p className="site">
						<b>Сайт:</b>
						<a href={site} target="_blank" rel="noopener noreferrer">
							{site}
						</a>
					</p>
				)}
				{showSchedule()}

				{phones.length > 0 && (
					<p className="phones">
						<b>Телефон:</b>
						{phones.map((item, i) => (
							<a key={i} href={`tel:${item.phone}`}>
								{item.phone}
							</a>
						))}
					</p>
				)}
				{email && (
					<p className="email">
						<b>E-mail: </b>
						<a href={`mailto:${email}`}>{email}</a>
					</p>
				)}
				<div className="button yellow" onClick={() => onChange(city.value)}>
					Показать все в этом же городе
				</div>
			</div>
		</Drawer>
	)
}

export default MapSingle
