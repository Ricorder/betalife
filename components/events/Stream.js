import PropTypes from 'prop-types'
import { useState } from 'react'
import { Countdown, Section } from 'components/common'

const EventStream = ({ date, video }) => {
	if (!video) return <></>

	const [show, setShow] = useState(false)
	return (
		<Section className="event-streem">
			<div className="sblock">
				{!show ? (
					<div className="row preview">
						<div className="preview-center">
							<span className="play" onClick={() => setShow(!show)} />
							<h2>Прямая трансляция</h2> {/* Лекция */}
							<Countdown date={date} />
						</div>
					</div>
				) : (
					<div className="event-player" dangerouslySetInnerHTML={{ __html: video }} />
				)}
			</div>
		</Section>
	)
}

EventStream.propTypes = {
	date: PropTypes.string,
	video: PropTypes.string
}

export default EventStream
