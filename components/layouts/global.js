import PropTypes from 'prop-types'
import classNames from 'classnames'

import useStore from 'core/store'
import { HeadSeo, Breadcrumbs, Section } from 'components/common'
import { Sources } from 'components/posts'

const GlobalLayout = ({ container, term, data, className, children, ...props }) => {
	const { _id, type, title, slug, seo, sources, categories } = data
	const { store, setStore } = useStore()

	const classes = classNames(
		// 'layout-page',
		{ [`layout-page`]: type === 'page' },
		{ [`layout-post`]: type === 'post' },
		{ [`post-${slug}`]: !term && type === 'post' },
		{ [`page-${slug}`]: !term && type !== 'page' },
		{ [`term-${slug}`]: term && !type },
		className
	)

	const showChildren = () => {
		return !container ? (
			children
		) : (
			<Section className="single">
				{children}
				{sources && <Sources>{sources}</Sources>}
			</Section>
		)
	}

	// console.log(`data:`, JSON.stringify(data, null, 2))

	return (
		data && (
			<div className={classes}>
				<HeadSeo slug={slug} {...seo} />

				<Breadcrumbs {...data} />

				{showChildren()}
			</div>
		)
	)
}

GlobalLayout.propTypes = {
	container: PropTypes.bool,
	term: PropTypes.bool,
	data: PropTypes.object
}

GlobalLayout.defaultProps = {
	container: true,
	term: false,
	data: {}
}

export default GlobalLayout
