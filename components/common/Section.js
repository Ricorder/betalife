import classNames from 'classnames'

export default function Section({ className, children, ...props }) {
	return (
		<section className={classNames('container section', className)} {...props}>
			<div className="container-inner">{children}</div>
		</section>
	)
}