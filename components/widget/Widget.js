import PropTypes from 'prop-types'

const Widget = ({ title, className, children, ...props }) => {
	return (
		<div className={`cbox qa-rubric ${className ? className : ''}`}>
			<div className="cb-place">
				<div className="cb-inner">
					{title && (
						<div className="row cb-title">
							<i className="cb-icon" />
							<h2>{title}</h2>
						</div>
					)}
					{children}
				</div>
			</div>
		</div>
	)
}

export default Widget
