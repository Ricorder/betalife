/**
 * Pre
 * use: <Pre console data={data} />
 */

const dev = process.env.NODE_ENV === 'development' ? true : false
export default function Pre({ data, ...props }) {
	if (!dev) return ''

	if (props.console) {
		console.log(`pre console: `, JSON.stringify(data, null, 2))
	}

	return (
		<code>
			<pre>{JSON.stringify(data, null, 2)}</pre>
		</code>
	)
}
