import React, { Children, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import PropTypes from 'prop-types'
import NextLink from 'next/link'

const Link = ({ children, activeClassName, ...props }) => {
	const { asPath, isReady } = useRouter()

	const child = Children.only(children)
	const childClassName = child.props.className || ''
	const [className, setClassName] = useState(childClassName)

	useEffect(() => {
		if (isReady) {
			const linkPathname = new URL(props.as || props.href, location.href).pathname
			const activePathname = new URL(asPath, location.href).pathname
			const newClassName = linkPathname === activePathname ? `${childClassName} ${activeClassName}`.trim() : childClassName
			if (newClassName !== className) {
				setClassName(newClassName)
			}
		}
	}, [asPath, isReady, props.as, props.href, childClassName, activeClassName, setClassName, className])

	return <NextLink {...props}>{React.cloneElement(child, { className: className || null })}</NextLink>
}

Link.propTypes = {
	activeClassName: PropTypes.string
}
Link.defaultProps = {
	activeClassName: 'active'
}

export default Link
