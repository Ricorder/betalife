import fetch from 'isomorphic-unfetch'
import settings from 'core/settings'

export const dataKeys = {
	state: {
		loading: false,
		agree_service: false,
		agree_personal: false,
		agree_mailing: false,
		agree_qa: false,
		topic: '',
		subject: '',
		email: '',
		name: '',
		msg: '',
		providers: [],
		requireds: ['email', 'name'],
		formData: ''
	},
	provider: ['getresponse', 'salesforce'],
	agree: ['[agree_service]', '[agree_personal]', '[agree_mailing]', '[agree_qa]']
}

const getKeyByValue = (o, v) => {
	return Object.keys(o).find((k) => o[k] === v)
}

export const getKeys = (arr, obj) => {
	return arr?.map((a) => getKeyByValue(obj, a))
}

export const ArrayToObject = (arr = [], key = 'key', value = 'value') => {
	if (!arr.length) return []
	return arr.reduce((a, i) => ({ ...a, [i[key]]: i[value] }), {})
}

export const getFields = ({ fields = [], providers = [] }) => {
	const requireds = fields?.filter((a) => a?.options?.required)?.map((a) => a.key)
	const state = fields?.filter((a) => a?.options?.status)?.map((a) => ({ key: a.key, value: '' }))
	const data = ArrayToObject(state)
	return { ...dataKeys.state, ...data, requireds, providers }
}

export const onSendForm = async (provider = 'salesforce', data) => {
	try {
		await fetch(`${settings.url}/api/form`, {
			method: 'POST',
			headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
			body: JSON.stringify({ ...data, provider })
		})
			.then((res) => res.json())
			.then((res) => {
				if (!res || res?.error) return { error: `error send form` }
				return { status: 'success', result: res }
			})
	} catch (e) {
		return { error: e.message }
	}
}

export const onFilterByParam = (param_name, param_value, item) => {
	if (typeof param_value === 'undefined') return true
	if (!param_value.length) return true

	if (param_name === 'search') {
		const re = new RegExp(_.escapeRegExp(param_value), 'i')
		if (item?.name) return re.test(item.name) || re.test(item.name)
		if (item?.desc) return re.test(item.desc) || re.test(item.desc)
		return re.test(item.title)
	}

	if (param_name === 'city') {
		return item?.fields?.city?.value === param_value && item
	}
	if (param_name === 'type') {
		return item?.fields?.type?.includes(param_value) && item
	}
}
