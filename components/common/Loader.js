export default function Loader({ place }) {
	const circleLoader = () => {
		return (
			<div className="loader">
				<style jsx>{`
					.loader {
						width: 40px;
						height: 40px;
						margin: 100px auto;
						border-radius: 50%;
						border: 5px solid #f3f3f3;
						border-top: 5px solid #ff8900;
						animation: spin 2s linear infinite;
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

	return place ? <div className="loader-place">{circleLoader()}</div> : circleLoader()
}
