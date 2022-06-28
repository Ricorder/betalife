import PropTypes from 'prop-types'
import Section from '../Section'
import { styleRemove } from 'core/utils/general'

const Content = ({ title, content, ...props }) => {
	return (
		<Section className="page-content">
			{title && <h1>{title}</h1>}
			{content && <div className="content pcreader" dangerouslySetInnerHTML={{ __html: styleRemove(content) }} />}
		</Section>
	)
}

Content.propTypes = {
	title: PropTypes.string,
	content: PropTypes.string
}

export default Content
