export default function Loader() {
	return (
		<div className="loader">
			<style jsx>{`
				.loader {
					animation: spin 2s linear infinite;
					border: 8px solid #f3f3f3;
					border-top: 8px solid #3498db;
					border-radius: 50%;
					margin-right: auto;
					margin-left: auto;
					margin-top: 40px;
					height: 40px;
					width: 40px;
				}
				@keyframes spin {
					0% {
						transform: rotate(0deg);
					}
					100% {
						transform: rotate(360deg);
					}
				}
			`}</style>
		</div>
	)
}
