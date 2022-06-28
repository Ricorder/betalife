import Head from 'next/head'
import { useRouter } from 'next/router'

import ErrorLayout from 'components/layouts/error'
import { BoxWrap } from 'components/common'

const Error = () => {
	const router = useRouter()
	return (
		<>
			<Head>
				<title>Ошибка 404 | Страница не найдена</title>
				<meta name="description" content="Ошибка 404 | Страница не найдена!" />
				<meta name="robots" content="noindex,nofollow" />
			</Head>
			<BoxWrap>
				<h1>
					<span>Ошибка</span>404
				</h1>
				<p dangerouslySetInnerHTML={{ __html: `Без паники! <br />Запрашиваемая вами страница недоступна, <br />но это не страшно.` }} />
				<a className="button" onClick={() => router.push('/')}>
					Начните с главной
				</a>
			</BoxWrap>
		</>
	)
}

Error.propTypes = {}
Error.Layout = ErrorLayout

export default Error
