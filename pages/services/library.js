import useAction from 'core/api'
import { styleRemove } from 'core/utils/general'

import { PageLayout } from 'components/layouts'
import { BoxWrap, Section } from 'components/common'

const library = [
	['den-za-dnem', 'pamatka-pacienta', 'zhizn-s-rasseyannym-sklerozom'],
	['dnevnik-pacienta', 'patient-calendar'],
	['teriflunomide', 'pamyatka-pacienta-terapiya-gla', 'pamyatka-pacienta-pitrs']
]

const LibraryPage = ({ data }) => {
	return (
		<PageLayout data={data}>
			<Section>
				<h1>Библиотека</h1>
				<div className="library">
					{library?.map((a, i) => (
						<div key={`r${i}`} className={`row c${a.length}`}>
							{a?.map((b, k) => (
								<BoxWrap key={b} className={b}>
									<a href={`/docs/${b}.pdf`} className="download" target="_blank" rel="noreferrer noopener" />
									<a href={`/docs/${b}.pdf`} className="button" download={`${b}.pdf`}>
										Скачать
									</a>
								</BoxWrap>
							))}
						</div>
					))}
				</div>

				{data?.content && <div className="ps-content" dangerouslySetInnerHTML={{ __html: styleRemove(data.content) }} />}
			</Section>
		</PageLayout>
	)
}
export async function getStaticProps() {
	const data = await useAction.get(`pages/library`)
	return { props: { data }, revalidate: 60 }
}

export default LibraryPage
