import Countdown, { zeroPad } from 'react-countdown'
import classNames from 'classnames'
import PropTypes from 'prop-types'

const CountdownComponent = ({ date, inline, label, desc, ...props }) => {
	return (
		<Countdown
			date={date}
			renderer={({ days, hours, minutes, completed }) =>
				!completed && (
					<div className={classNames('countdown', { inline: inline })}>
						{desc && <div className="cd-desc" dangerouslySetInnerHTML={{ __html: desc }} />}
						<span className="row cd-timer">
							<span className="sd-num days">
								<b>{zeroPad(days)}</b>
								{label && <p>дней</p>}
							</span>
							<span className="cd-sep">:</span>
							<span className="sd-num hours">
								<b>{zeroPad(hours)}</b>
								{label && <p>часов</p>}
							</span>
							<span className="cd-sep">:</span>
							<span className="sd-num minutes">
								<b>{zeroPad(minutes)}</b>
								{label && <p>минут</p>}
							</span>
						</span>
					</div>
				)
			}
		/>
	)
}

CountdownComponent.propTypes = {
	date: PropTypes.string.isRequired,
	inline: PropTypes.bool,
	label: PropTypes.bool,
	desc: PropTypes.any
}

CountdownComponent.defaultProps = {
	desc: 'До начала осталось:',
	inline: true,
	label: false
}

export default CountdownComponent
