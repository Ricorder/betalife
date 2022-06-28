import { Countdown, Section } from 'components/common'
import { Lecture } from 'components/forms'

const EventSignUp = ({ date, ...props }) => {
	return (
		<Section className="event-signup" id="signup">
			<div className="row sblock">
				<div className="column lside">
					<div className="desc">
						<div className="heading">
							<h2>Регистрируйтесь, чтобы не пропустить начало вебинара</h2>
						</div>
						<p className="subsc">Отправляйте свой вопрос, на который врач ответит в прямом эфире.</p>
						{date && <Countdown date={date} desc="До начала:" />}
					</div>
				</div>
				<div className="column rside">
					<Lecture form="lecture" />
				</div>
			</div>
		</Section>
	)
}

export default EventSignUp
