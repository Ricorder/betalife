import PropTypes from 'prop-types'
import classNames from 'classnames'
import ReactPlayer from 'react-player'
import { useRef, useState } from 'react'
import Loader from './Loader'

const VideoPlayer = ({ mode, pattern, preview = '', video = '' }) => {
	const playerRef = useRef()
	const [values, setValues] = useState({ ready: '', playing: true })
	const { ready, playing } = values

	const playerProps = {
		...values,
		width: '100%',
		height: '100%',
		light: preview,
		controls: true,
		className: `player ${playing ? 'playing' : 'paused'}`,
		playIcon: (
			<span className="play">
				<i className={classNames('fas', { 'fa-pause': !playing, 'fa-play': playing })} />
			</span>
		),
		url: mode === 'html5' ? video : `https://www.youtube.com/watch?v=${video}`,
		onReady: () => setValues({ ...values, ready: 'true' })
	}

	return (
		<div className={classNames('video-player', { 'player-pattern': pattern, played: playing, pause: !playing })}>
			{!ready && <Loader />}
			{ready && (
				<span className={classNames('player-control', { played: playing, pause: !playing })} onClick={() => setValues({ ...values, playing: !playing })}>
					<i className={classNames('fas', { 'fa-pause': playing, 'fa-play': !playing })} />
				</span>
			)}
			{video && (
				<div className="player-wrap">
					<ReactPlayer ref={playerRef} {...playerProps} />
				</div>
			)}
		</div>
	)
}

VideoPlayer.propTypes = {
	mode: PropTypes.oneOf(['html5', 'youtube']),
	pattern: PropTypes.bool,
	preview: PropTypes.any,
	video: PropTypes.any
}
VideoPlayer.defaultProps = {
	mode: 'html5',
	pattern: false
}

export default VideoPlayer
