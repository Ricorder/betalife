import { useEffect } from 'react'

import useAction from 'core/api'
import useStore from 'core/store'
import { nl2br } from 'core/utils/general'

import TaxonomyLayout from 'components/layouts/category'
import { Subscription } from 'components/widgets'
import { BoxWrap } from 'components/common'
import { Post } from 'components/posts'

const TagStatusPage = ({ taxonomy, records, paginate }) => {
	const { store, setStore } = useStore()

	useEffect(() => {
		setStore({ ...store, statusbar: true, curstatus: taxonomy?._id })
	}, [taxonomy])

	const showNotice = () => {
		const noticekeys = {
			'podozrenie-na-rs': `<p><strong>Рассеянный склероз нарушает естественный поток информации между мозгом и телом из-за разрушения миелина, вещества покрывающего нервные волокна и защищающие их. </strong></p><p>На сегодняшний день все больше людей сталкиваются с проблемой рассеянного склероза.</p><p>По всему миру насчитывается около 3 миллионов больных РС. Рассеянный склероз не имеет ничего общего со склерозом, который принято называть старческим.</p>`,
			'diagnostirovan-rs': `<p>Современные исследования указывают на мультифакторный источник развития РС. Когда определенная комбинация внешних и внутренних факторов начинает воздействовать на генетически предрасположенный организм, развивается патологический процесс — хроническое воспаление и аутоиммунные реакции. С течением времени без надлежащей терапии у больного может вновь возникнуть обострение с вовлечением новых клеток белого вещества и образованием более крупных очагов воспаления.</p>`,
			'naznachili-terapiyu': `<p>В последние годы все большее распространение и клиническое обоснование при лечении РС занимает особая группа препаратов — ПИТРС (препараты, изменяющие течение рассеянного склероза). В каждом конкретном случае ПИТРС подбираются индивидуально, с учетом характера течения заболевания, уже имеющейся симптоматики и ранее назначаемой терапии.</p><p>В настоящее время выработался алгоритм применения ПИТРС, включающий поводы для назначения, коррекции, отмены и перевода пациентов на другой препарат этой группы.<br>
			Эти препараты назначаются при установленном достоверном диагнозе РС, как можно раньше после установления диагноза.</p>`,
			'patsient-so-stazhem': ``,
			'u-rebenka-rs': ``,
			'blizkij-bolnogo': `<p><strong>Рассеянный склероз нарушает естественный поток информации между мозгом и телом из-за разрушения миелина, вещества покрывающего нервные волокна и защищающие их.</strong></p><p>На сегодняшний день все больше людей сталкиваются с проблемой рассеянного склероза (РС). По всему миру насчитывается около 3 миллионов больных РС. Рассеянный склероз не имеет ничего общего со склерозом, который принято называть старческим. Это болезнь молодых людей, которая может возникнуть даже у детей.</p>`
		}
		if (typeof noticekeys[taxonomy.slug] !== 'undefined' && noticekeys[taxonomy.slug].length) {
			return <BoxWrap title="Справка" excerpt={noticekeys[taxonomy.slug]} className="article" />
		}
	}

	return (
		<TaxonomyLayout head={false} data={taxonomy}>
			{/* Get Template: Preview */}

			<div className="page-head head-status-tax">
				<h1 className="hide">{taxonomy.name}</h1>
				<div className="desc" dangerouslySetInnerHTML={{ __html: taxonomy.excerpt }} />
				<div className="tag">
					<span>#</span>
					{taxonomy.name}
				</div>
			</div>

			<div className="row category-posts-preview">
				<div className="column content">
					{showNotice()}
					{records?.length > 0 ? records?.map((item) => <Post key={item.slug} taxonomy={taxonomy} {...item} />) : <p>Записей не найдено!</p>}
				</div>
				<div className="column side">
					<Subscription />
				</div>
			</div>
		</TaxonomyLayout>
	)
}

export async function getStaticPaths() {
	const paths = await useAction.get('terms/statuses/paths').then((result) => result?.tags)
	return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
	const data = await useAction.get(`taxonomies/${params.tag}`, { skip: 0, limit: 100, typespost: 'post' })
	if (!data || data.error) return { notFound: true }
	return { props: { ...data }, revalidate: 60 }
}

export default TagStatusPage
