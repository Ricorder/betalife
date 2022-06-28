import classNames from 'classnames'

const Heading = ({ subtitle, title, desc, className, ...props }) => {
	return (
		<div className={classNames('heading', className)} {...props}>
			{subtitle && <span className="stitle">{subtitle}</span>}
			{desc ? (
				<div className="row colums">
					{title && <h2 dangerouslySetInnerHTML={{ __html: title }} />}
					{desc && <div className="desc" dangerouslySetInnerHTML={{ __html: desc }} />}
				</div>
			) : (
				title && <h2 dangerouslySetInnerHTML={{ __html: title }} />
			)}
		</div>
	)
}

export default Heading
