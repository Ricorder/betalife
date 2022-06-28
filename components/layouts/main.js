import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { Loader, Header, Footer, Statuses, AccessDenied } from './particles'

const NoticeUsing = dynamic(() => import('./particles/NoticeUsing'), { loading: <Loader />, srr: false })

export default function MainLayout({ sticky, element, children }) {
	const router = useRouter()

	return (
		<div className={`main-layout ${sticky ? 'sticky' : ''}`} id="top">
			<Header />
			{router.pathname !== '/' && <Statuses />}

			<div className="layout-components" ref={element}>
				{children}
			</div>

			<Footer />

			<NoticeUsing />
		</div>
	)
}
