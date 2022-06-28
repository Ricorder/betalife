import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import classNames from 'classnames'

import { truncate } from 'core/utils/general'
import { useWindowSize, useYouTubeByIDs } from 'core/hooks'
import { Loader, Section, VideoPlayer } from 'components/common'

const EventVideos = ({ ids }) => {
	const { videos, status } = useYouTubeByIDs(ids)

	const size = useWindowSize()
	const router = useRouter()

	useEffect(() => {
		size.width < 768 ? setValues({ ...values, visible: false }) : setValues({ ...values, visible: true })
	}, [size.width])

	const [values, setValues] = useState({ current: '', play: false, visible: true })
	const { current, play, visible } = values

	useEffect(() => {
		if (videos.length > 0 && status === 'loaded') {
			setValues({ ...values, current: videos[0] })
		}
	}, [status, videos])

	if (status === 'loading') return <Loader />

	return (
		status === 'loaded' &&
		videos.length > 0 && (
			<Section className="event-pastevents">
				<div className="heading">
					<h2>Записи прошедших мероприятий</h2>
				</div>

				<div className="row">
					<div className="column c1" id="player">
						{current?.id && <VideoPlayer mode="youtube" pattern={false} preview={current.image.maxres.url} video={current.id} />}
						<div className="video-content">
							{current?.title && <div className="title">{current.title}</div>}
							{current?.desc && <div className="desc">{current.desc}</div>}
						</div>
					</div>
					<button className={classNames('button', visible && 'active')} onClick={() => setValues({ ...values, visible: !visible })}>
						{visible ? 'Скрыть' : 'Больше видео'}
					</button>
					{visible && (
						<div className="column c2">
							<div className="playlist">
								{videos?.map((item) => (
									<div
										key={item.id}
										className={classNames('row item', { active: item.id === current?.id })}
										onClick={() => {
											setValues({ ...values, current: item })
											router.push('#player')
										}}>
										<span className="item-preview">{item?.image?.medium && <img src={item.image.medium.url} alt={item.title} />}</span>
										<span className="item-body">
											{item.title && <p className="item-title">{item.title}</p>}
											{item.desc && <p className="item-desc" dangerouslySetInnerHTML={{ __html: truncate(item.desc, 80) }} />}
										</span>
									</div>
								))}
							</div>
						</div>
					)}
				</div>
			</Section>
		)
	)
}

export default EventVideos

{
	/* <div className={classNames('player', { played: play, paused: !play })} style={{ backgroundImage: `url(${current.image.maxres.url})` }}><span className="play" onClick={() => setValues({ ...values, play: !play })}><i className={classNames('fas', { 'fa-pause': play, 'fa-play': !play })} /></span>{play && <iframe src={`https://www.youtube.com/embed/${current.id}?rel=0&showinfo=0&autohide=1`} />}</div> */
}
