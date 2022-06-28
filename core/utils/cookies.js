import cookie from 'js-cookie'

const cookies = {
	set: (key, value) => process.browser && cookie.set(key, value, { expires: 60, path: '/' }),

	get: (key, req) => (process.browser ? cookies.getBrowser(key) : cookies.getServer(key, req)),

	remove: (key) => process.browser && cookie.remove(key, { expires: 1 }),

	getBrowser: (key) => process.browser && cookie.get(key),

	getServer: (key, req) => {
		if (!req.headers.cookie) return undefined
		const rawCookie = req.headers.cookie.split(';').find((c) => c.trim().startsWith(`${key}=`))
		if (!rawCookie) return undefined
		return rawCookie.split('=')[1]
	}
}

export default cookies
