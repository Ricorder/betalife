// import { Footer, Header } from './particles'

export default function ErrorLayout({ children }) {
	return (
		<div className="error-layout">
			{/* <Header /> */}
			<div className="container error-page">
				<div className="container-inner error-content">{children}</div>
			</div>
			{/* <Footer /> */}
		</div>
	)
}
