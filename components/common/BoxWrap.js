export default function BoxWrap({ children, icon, title = null, excerpt = null, ...props }) {
	const { className = '', onClickTitle = null } = props

	const cbicon = icon ? `icon-${icon}` : ''
	const titleClass = `row cb-title ${onClickTitle ? 'cursor' : ''}`
	return (
		<div className={`cbox ${className}`}>
			<div className="cb-place">
				<div className="cb-inner">
					{title && (
						<div className={titleClass} onClick={onClickTitle}>
							<i className={`cb-icon ${cbicon}`} />
							<h2 dangerouslySetInnerHTML={{ __html: title }} />
						</div>
					)}
					{excerpt && <div className="cb-body" dangerouslySetInnerHTML={{ __html: excerpt }} />}
					{children}
				</div>
			</div>
		</div>
	)
}
