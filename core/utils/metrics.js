/* GTM PageView */
export const pageview = (url) => {
	if (typeof window !== 'undefined') {
		window.dataLayer.push({ event: 'pageview', page: url, title: document.title })
	}
}

/* GTM Event */
export const gtmevent = (event) => {
	if (process.env.NODE_ENV === 'production' && typeof window !== 'undefined') {
		event && window.dataLayer.push({ event, event_category: 'goals' })
	}
}

/* WebVitals Send
export const sendMetric = ({ name, value }) => {
	const url = `https://qckm.io?m=${name}&v=${value}&k=dKVVeWMjV23EywVEVz-4bQ`
	if (navigator.sendBeacon) {
		navigator.sendBeacon(url)
	} else {
		fetch(url, { method: 'POST', keepalive: true })
	}
} */
