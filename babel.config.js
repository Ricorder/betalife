module.exports = {
	presets: [['next/babel']],
	plugins: [
		['babel-plugin-styled-components', { minify: false, ssr: true }],
		['import', { libraryName: 'antd', libraryDirectory: 'lib', style: 'index.css' }],
		['inline-react-svg']
	],
	env: {
		production: {
			plugins: [['babel-plugin-styled-components', { ssr: true, displayName: false, minify: true }], 'transform-remove-console']
		}
	}
}
