import { BoxWrap } from 'components/common'
import { Subscribe } from 'components/forms'

const Subscription = (props) => {
	return (
		<BoxWrap className="widget subsc" icon="subsc" title="Подпишитесь на обновления проекта">
			<Subscribe form="subscribe" />
		</BoxWrap>
	)
}

export default Subscription
