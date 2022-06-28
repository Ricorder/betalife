import Head from 'next/head'
import { useRouter } from 'next/router'

export default function AccessDenied() {
	const router = useRouter()
	return (
		<>
			<Head>
				<title>Доступ заблокирован</title>
				<meta name="description" content="Вы должны войти в систему, чтобы просмотреть эту страницу" />
				<meta name="robots" content="noindex,nofollow" />
			</Head>
			<div className="page-access-denied">
				<div className="form-result access-denied">
					<div className="inner">
						<div className="title">Доступ заблокирован</div>
						<div className="desc">
							Вы должны <span onClick={() => router.push('/')}>войти в систему</span>, чтобы просмотреть эту страницу
						</div>

						<button key="close" className="button green" onClick={() => router.push('/')}>
							<i className="fas fa-user" />
							Войти
						</button>
					</div>
				</div>
			</div>
		</>
	)
}
