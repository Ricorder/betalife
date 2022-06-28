import { useState } from 'react'
import { BoxWrap } from 'components/common'

export default function Sources({ title = 'Источники', children }) {
	const [toggle, setToggle] = useState(false)
	const classes = toggle ? `source open` : `source`
	return (
		<BoxWrap title="Источники" className={classes} onClickTitle={() => setToggle(!toggle)}>
			{toggle && <div className="source-content" dangerouslySetInnerHTML={{ __html: children }} />}
		</BoxWrap>
	)
}
