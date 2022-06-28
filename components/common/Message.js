import PropTypes from 'prop-types'
import { Alert } from 'antd'

const Message = ({ type, msg, title, ...props }) => {
	return (
		msg?.length > 0 && (
			<div className="messages">
				<Alert type={type} message={title ? title : msg} description={title && msg} {...props} />
			</div>
		)
	)
}

Message.propTypes = {
	type: PropTypes.oneOf(['success', 'info', 'warning', 'error']).isRequired,
	title: PropTypes.string,
	msg: PropTypes.string
}

Message.defaultProps = {
	type: 'error',
	title: null,
	msg: ''
}

export default Message
