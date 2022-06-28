const localServer = false
const apiUrl = localServer ? 'http://localhost:8000' : 'https://api.biocadless.com'
const siteUrl = process.env.NODE_ENV === 'production' ? 'https://betalife.ru' : 'http://localhost:3000'

const settings = {
	locale: 'ru',
	title: 'BETALIFE',
	site_name: 'BETALIFE',
	description: 'Портал для пациентов с рассеянным склерозом',
	url: siteUrl,
	background_color: '#f8f8f8',
	theme_color: '#ff6b00',
	imagemode: 'next', // enum: ['static','next']

	metrics: {
		gtm: 'GTM-5PLQWWX', // GTM-XXXXXXX
		yandex: 'aa3ffe3b3106a386', // yandex-verification
		google: 'Bx3s3Qo6T84CN_eMxLW1lf9WbkgvupC02odqkL0FXC0' // google-site-verification
	},

	api: `${apiUrl}/v1`,
	apiupl: `${apiUrl}/uploads/betalife`,
	client_id: process.env.CLIENT_ID || 'betalife',
	client_secret: process.env.CLIENT_SECRET
}

export default settings
