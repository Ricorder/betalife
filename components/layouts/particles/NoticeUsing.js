import { useEffect, useRef, useState } from 'react'
import { MobileView, isMobile, isIOS, isAndroid } from 'react-device-detect'

import useLocalStorage from 'core/hooks/useLocalStorage'
import useOnClickOutside from 'core/hooks/useOnClickOutside'

const osdata = {
	ios: { link: 'https://apps.apple.com/ua/app/betalife/id1507787822?l=ru', title: 'Apple Store' },
	android: { link: 'https://play.google.com/store/apps/details?id=com.betalife', title: 'Google Play' }
}

const NoticeUsing = (props) => {
	const refbox = useRef()
	const [notice, setNotice] = useLocalStorage('useapp', 'show')
	const [mobileos, setMobileOs] = useState({ os: false, data: '' })

	useEffect(() => {
		if (!mobileos?.os && isMobile) {
			const os = isIOS ? 'ios' : isAndroid ? 'android' : false
			const data = osdata[os]
			return os && data && setMobileOs({ os, data })
		}
	}, [isMobile])

	const clickHideBox = () => setNotice('hide')
	useOnClickOutside(refbox, clickHideBox)

	if (notice === 'hide') return <></>

	return (
		notice !== 'hide' && (
			<MobileView className="useapp">
				<div className="row inner" ref={refbox}>
					{mobileos?.os && mobileos?.data?.link && (
						<a
							href={mobileos.data.link}
							title={`${mobileos.data.title} - Откроется небольшое окно`}
							rel="noreferrer noopener"
							onClick={clickHideBox}
							className="logo"
							target="_blank"
						/>
					)}
					<h2>
						Открыть <span>в приложении</span> BETALIFE APP
					</h2>
					<p>Больше полезных функций, а еще удобный личный дневник в мобильном приложении.</p>
					{mobileos?.data?.link && (
						<a
							href={mobileos.data.link}
							title={`${mobileos.data.title} - Откроется небольшое окно`}
							className="button outline"
							rel="noreferrer noopener"
							onClick={clickHideBox}
							target="_blank">
							Открыть в приложении
						</a>
					)}
					<u className="close" onClick={clickHideBox}>
						Возможно, позже
					</u>
				</div>
			</MobileView>
		)
	)
}

export default NoticeUsing
