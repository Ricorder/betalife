import PropTypes from 'prop-types'
import classNames from 'classnames'
import { useState } from 'react'

const Sources = ({ mode, title, content, className, children }) => {
	const [show, setShow] = useState(false)
	const onToggle = () => setShow(!show)

	return (
		<div className={classNames('block-source', `mode-${mode}`, { active: show }, className)}>
			<div className="row sb-source-header" onClick={onToggle}>
				<span className="sb-source-title">{title}</span>
				<i className="sb-source-arrow" />
			</div>
			{show && (
				<div className="sb-source-content">
					{mode === 'list' && content?.length > 0 ? (
						<ol>
							{content.map((item, i) => (
								<li key={i} id={`s${i}`} dangerouslySetInnerHTML={{ __html: item }} />
							))}
						</ol>
					) : (
						children
					)}
				</div>
			)}
		</div>
	)
}

Sources.propTypes = {
	mode: PropTypes.oneOf(['list', 'text']),
	title: PropTypes.string,
	content: PropTypes.array
}
Sources.defaultProps = {
	mode: 'list',
	title: 'Источники'
}

export default Sources
