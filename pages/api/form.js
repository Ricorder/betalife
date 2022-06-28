const fetch = require('isomorphic-unfetch')
const queryString = require('query-string')

const queryUrl = (url, query) => queryString.stringifyUrl({ url, query })

export default async function getSendForm(req, res) {
	if (req.method === 'POST') {
		const { provider, campaignId, email, name } = req.body

		try {
			const providers = {
				salesforce: {
					url: queryUrl('https://webto.salesforce.com/servlet/servlet.WebToCase?encoding=UTF-8', req.body),
					options: {
						method: 'GET',
						headers: { 'Cache-Control': 'no-cache', 'Content-Type': 'application/x-www-form-urlencoded' }
					}
				},
				getresponse: {
					url: 'https://api.getresponse.com/v3/contacts',
					options: {
						method: 'POST',
						headers: { 'Content-Type': 'application/json', 'X-Auth-Token': 'api-key 7czip1846qpug785543s3fiifwe2tnf4', 'api-key': '7czip1846qpug785543s3fiifwe2tnf4' },
						body: JSON.stringify({ campaign: { campaignId }, name, email })
					}
				}
			}

			if (typeof providers[provider] === 'undefined') {
				return res.status(422).json({ status: 'error', message: `Provider «${provider}» not found` })
			}

			return await fetch(providers[provider].url, providers[provider].options)
				.then((result) => res.status(200).json({ status: `success`, result }))
				.catch((e) => res.status(400).json({ error: e.message }))
		} catch (e) {
			return res.status(500).json({ error: e.message })
		}
	} else {
		return res.status(422).json({ error: ` Error!` })
	}
}
