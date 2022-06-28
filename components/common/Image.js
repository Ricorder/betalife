import PropTypes from 'prop-types'
import NextImage from 'next/image'
import settings from 'core/settings'

// src: `${settings.apiupl}/${src}`, alt,

const Image = ({ ...rest }) => {
	const imageProps = {
		priority: true,
		unoptimized: true,
		layout: 'fill',
		objectFit: 'cover',
		objectPosition: '50% 50%',
		blurDataURL: 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==',
		placeholder: 'blur',
		...rest
	}
	return settings?.imagemode === 'next' ? <NextImage {...imageProps} /> : <img src={rest?.src} alt={rest?.alt} />
}

Image.propTypes = { api: PropTypes.bool }
Image.defaultProps = { api: false }

export default Image

/**
 * Use Example
 * 1. Fill:
 * 		<Image src={url} alt={title} />
 * 2. Responsive:
 * 		<Image src={url} alt={title} layout="responsive" width={500} height={500} />
 */
