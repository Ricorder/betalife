import React from 'react'
import PropTypes from 'prop-types'

const Head = ({ title, excerpt, children, ...props }) => {
	const className = 'page-banner ' + props.className
	return (
		<div className={className}>
			{title && <div className="ph-title">{title}</div>}
			{excerpt && <div className="ph-desc">{excerpt ? excerpt : children}</div>}
		</div>
	)
}

Head.propTypes = {
	title: PropTypes.string,
	excerpt: PropTypes.string,
	children: PropTypes.node
}

export default Head
