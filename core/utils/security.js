const ContentSecurityPolicy = `
default-src 'self';
script-src 'self' 'unsafe-eval' 'unsafe-inline' *.youtube.com *.biocadless.com *.google.com *.googleapis.com *.gstatic.com *.googletagmanager.com *.google-analytics.com *.doubleclick.net *.youtube.com *.yandex.ru *.salesforce.com *.twitter.com *.usefathom.com *.vk.com *.dataforum.pro;
child-src *.biocadless.com *.google.com *.gstatic.com *.doubleclick.net *.youtube.com *.salesforce.com *.twitter.com *.vk.com *.dataforum.pro;
style-src 'self' 'unsafe-inline' *.googleapis.com *.gstatic.com *.cloudflare.com *.vk.com *.dataforum.pro;
img-src * blob: data: *.biocadless.com *.vk.com;
font-src 'self' 'unsafe-eval' *.gstatic.com;
frame-src 'self' *.dataforum.pro;
connect-src *;
media-src *;
`

/**
 * Security headers used in the app (protecting against XSS attacks)
 * https://infosec.mozilla.org/guidelines/web_security
 */
module.exports = [
	// https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP
	{ key: 'Content-Security-Policy', value: ContentSecurityPolicy.replace(/\n/g, '') },
	// https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cross-Origin-Resource-Policy
	{ key: 'Cross-Origin-Resource-Policy', value: 'same-origin' },
	// https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy
	{ key: 'Referrer-Policy', value: 'origin-when-cross-origin' }, // [origin, origin-when-cross-origin, strict-origin-when-cross-origin]
	// https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options
	{ key: 'X-Frame-Options', value: 'DENY' },
	// https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Content-Type-Options
	{ key: 'X-Content-Type-Options', value: 'nosniff' },
	// https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-DNS-Prefetch-Control
	{ key: 'X-DNS-Prefetch-Control', value: 'on' },
	// https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security
	{ key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains; preload' },
	// https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Feature-Policy | Opt-out of Google FLoC: https://amifloced.org
	{ key: 'Permissions-Policy', value: 'interest-cohort=(), camera=(), microphone=(), geolocation=()' },
	// https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Server
	{ key: 'Server', value: 'Apache' },
	// https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-XSS-Protection
	{ key: 'X-XSS-Protection', value: '1; mode=block' }
]
