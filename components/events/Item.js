import { dateformat, truncate } from 'core/utils/general'

const EventItem = ({ title, excerpt, fields, ...props }) => {
	return (
		<div className="item">
			{fields?.date && (
				<div className="row date">
					<p dangerouslySetInnerHTML={{ __html: dateformat(fields.date, `[<span>Вебинар:</span>] DD MMMM YYYY [<span>|</span>] Начало:  HH:mm`) }} />
				</div>
			)}
			<h2>{item.title}</h2>
			{excerpt && <div className="excerpt" dangerouslySetInnerHTML={{ __html: truncate(excerpt, 230) }} />}
		</div>
	)
}

export default EventItem
