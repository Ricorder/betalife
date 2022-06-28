import fetch from 'isomorphic-unfetch'
import queryString from 'query-string'
import cookies from 'js-cookie'
import settings from 'core/settings'

/** Api Calls */
const headers = {
	Accept: 'application/json',
	Authorization: `Bearer ${cookies.get('token')}`,
	'x-biocad-app': settings.client_id
}

const apiEndpoint = (type, params) => {
	const queryParams = params ? `/?${queryString.stringify(params)}` : ''
	return `${settings.api}/${type}${queryParams}`
}

const apiStatus = async (response) => {
	if (response.status >= 200 && response.status < 300) {
		return Promise.resolve(response)
	} else if (response.status === 400) {
		return Promise.resolve(response)
	} else if (response.status === 401) {
		// return await signOut()
		return Promise.resolve(response)
	} else if (response.status === 422) {
		return Promise.resolve(response)
	} else if (response.status === 403) {
		return Promise.resolve(response)
	} else {
		return Promise.reject(new Error(response.statusText))
	}
}

const apiResponse = (response) => response.json()

const apiError = (e) => {
	console.log(`ApiError: `, e.message)
	return { error: e.message }
}

const useAction = {
	get: async (url, params) => {
		const endpoint = apiEndpoint(url, params)
		const options = { method: 'GET', headers: { ...headers, Authorization: `Bearer ${cookies.get('token')}` } }
		return await fetch(endpoint, options).then(apiStatus).then(apiResponse).catch(apiError)
	},

	post: async (url, data, type = 'formdata') => {
		const endpoint = apiEndpoint(url)
		const options = {
			method: 'POST',
			headers: type === 'json' ? { ...headers, 'Content-Type': 'application/json' } : { ...headers },
			body: type === 'json' ? JSON.stringify(data) : data
		}
		return await fetch(endpoint, options).then(apiStatus).then(apiResponse).catch(apiError)
	},

	auth: async (url, data) => {
		const endpoint = apiEndpoint(url)
		const options = { method: 'POST', headers: { ...headers, 'Content-Type': 'application/json' }, body: JSON.stringify(data) }
		return await fetch(endpoint, options).then(apiStatus).then(apiResponse).catch(apiError)
	}
}

export default useAction
