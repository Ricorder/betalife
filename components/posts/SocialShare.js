import { FacebookShareButton, OKShareButton, VKShareButton } from 'react-share'
import settings from 'core/settings'

const SocialShare = ({ title = '', desc = '', image = '', url }) => {
	const _url = url ? `${settings.apiupl}/${url}` : settings.url
	const _image = image ? `${settings.apiupl}/${image}` : null

	return (
		url &&
		desc &&
		title && (
			<div className={classNames('social-share', className)}>
				<b>Поделится:</b>

				<div className="row social">
					<FacebookShareButton quote={title}>
						<span className="share-icon fb" />
					</FacebookShareButton>

					<OKShareButton url={_url} title={title} description={desc} image={_image}>
						<span className="share-icon ok" />
					</OKShareButton>

					<VKShareButton url={_url} title={title} image={_image}>
						<span className="share-icon vk" />
					</VKShareButton>
				</div>
			</div>
		)
	)
}

SocialShare.propTypes = {
	title: PropTypes.string,
	desc: PropTypes.string,
	image: PropTypes.string,
	url: PropTypes.string
}

SocialShare.defaultProps = {}

export default SocialShare
