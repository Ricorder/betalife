import _ from 'lodash'
import moment from 'moment'
import 'moment/locale/ru'
moment.locale('ru')

/** Moment Date Formater */
export const dateformat = (date, format = 'DD.MM.YYYY, HH:mm') => {
	if (!date) return '---'
	if (format) return format === 'from_now' ? moment(date).fromNow() : moment(date).format(format)
	return moment(date).format('DD.MM.YYYY, HH:mm')
}

/** Text Time Read */
export const getReadingTime = (text = '') => {
	if (!text.length) return 0

	const wpm = 225
	const striptags = text
		.replace(/<\/?[^>]+(>|$)/g, '')
		.replace(/style=".*?"/gm, '')
		.trim()

	const words = striptags.split(/\s+/).length
	const totaltime = Math.ceil(words / wpm)
	return (
		<span className="reading-time">
			<span>Время чтения:</span> <b>{totaltime} мин.</b>
		</span>
	)
}

/** Truncate Text */
export const truncate = (text, limit = 200, stripTags = false) => {
	if (!text) return
	text = text.trim()
	if (text.length <= limit) return text
	if (stripTags === true) {
		text = text.replace(/<\/?[^>]+(>|$)/g, '')
	}
	text = text.slice(0, limit)
	return text.trim() + '...'
}

export const nl2br = (text = '', tag = 'p') => {
	if (tag === 'p') return text.split('\n').map((line, i) => <p key={i}>{line}</p>)
	return text.replace(/\n/g, '<br />')
}

export const styleRemove = (text = '') => {
	return text.replace(/style=".*?"/gm, '')
}

/**
 * name: linkify
 * desc: Finding links in plain-text and converting them to HTML <a> tags
 */
export const linkify = (text) => {
	const options = { target: '_blank', rel: 'noreferrer noopener' }

	//URLs starting with http://, https://, or ftp://
	const urlPattern = /(\b(https?|http|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim
	//URLs starting with "www." (without // before it, or it'd re-link the ones done above).
	const pseudoUrlPattern = /(^|[^\/])(www\.[\S]+(\b|$))/gim
	//Change email addresses to mailto:: links.
	const emailAddressPattern = /(([a-zA-Z0-9\-\_\.])+@[a-zA-Z\_]+?(\.[a-zA-Z]{2,6})+)/gim

	return text
		.replace(urlPattern, `<a href="$1" target="_blank" rel="noreferrer noopener">$1</a>`)
		.replace(pseudoUrlPattern, '$1<a href="http://$2" target="_blank" rel="noreferrer noopener">$2</a>')
		.replace(emailAddressPattern, '<a href="mailto:$1">$1</a>')
}

/** Random Object from Array */
export const random = (arr) => {
	return arr[Math.floor(Math.random() * arr.length)]
}

/** Marge Arrays */
export const arraysMarge = (aOne, aTwo) => {
	const merged = _.merge(_.keyBy(aOne, 'key'), _.keyBy(aTwo, 'key'))
	const values = _.values(merged)
	return values
}

/** classNames */
export const classNames = (...args) => {
	if (args) {
		let classes = []
		for (let i = 0; i < args.length; i++) {
			let className = args[i]
			if (!className) continue
			const type = typeof className
			if (type === 'string' || type === 'number') {
				classes.push(className)
			} else if (type === 'object') {
				const _classes = Array.isArray(className) ? className : Object.entries(className).map(([key, value]) => (!!value ? key : null))
				classes = _classes.length ? classes.concat(_classes.filter((c) => !!c)) : classes
			}
		}
		return classes.join(' ')
	}
	return undefined
}
