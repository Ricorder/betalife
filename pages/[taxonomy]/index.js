import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import useAction from 'core/api'

import { TaxonomyLayout } from 'components/layouts'
import { Link, Loader, BoxWrap } from 'components/common'
import { Subscription } from 'components/widgets'

import { Post } from 'components/posts'
import ListPosts from 'components/posts/ListPosts'

const CategoryPage = ({ taxonomy, records = [] }) => {
	const router = useRouter()
	const [values, setValues] = useState({ loading: false, current: '' })
	const { loading, current } = values

	const onChoisePost = (slug) => (e) => {
		e.preventDefault()
		const post = slug && records?.find((a) => a.slug === slug)
		setValues({ ...values, current: post })
		router.push('#preview')
	}

	const getTemplate = () => {
		const modview = taxonomy.slug === 'news' ? 'preview' : 'list'

		return modview === 'list' ? (
			<div className="row category-posts-list">
				<div className="column childrens">
					<ListPosts loading={loading} taxonomy={taxonomy.slug} posts={records} active={current} onChange={onChoisePost} />
				</div>
				<div id="preview" className="column preview">
					{current && (
						<BoxWrap title={current.title} excerpt={current.excerpt}>
							<Link href="/[taxonomy]/[post]" as={`/${taxonomy.slug}/${current.slug}`}>
								<a className="button button-view" title="Читать полностью">
									<i className="fas fa-eye" /> Читать полностью
								</a>
							</Link>
						</BoxWrap>
					)}
					{!current && <BoxWrap excerpt={taxonomy?.fields?.other_desc} />}
				</div>
			</div>
		) : (
			modview === 'preview' && (
				<div className="row category-posts-preview">
					<div className="column content">{!loading ? records?.length > 0 && records?.map((a) => <Post key={a.slug} taxonomy={taxonomy} {...a} />) : <Loader />}</div>
					<div className="column side">
						<Subscription />
					</div>
				</div>
			)
		)
	}

	return (
		<TaxonomyLayout head={true} data={taxonomy}>
			{getTemplate()}
		</TaxonomyLayout>
	)
}

export async function getStaticPaths() {
	const paths = await useAction.get('taxonomies/paths', { only: 'taxonomy' })
	return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
	const data = await useAction.get(`taxonomies/${params.taxonomy}`, { skip: 0, limit: 100 })
	if (!data || data.error) return { notFound: true }
	return { props: { ...data }, revalidate: 60 }
}

export default CategoryPage

/* <BoxWrap key={item.slug} className="article"><div className="row article-inner"><div className="aside"><div className="image">{item?.media?.file && (<Link href="/[taxonomy]/[post]" as={`/${taxonomy.slug}/${item.slug}`}><a title={item.title}><img src={`${config.apiupl}/580x580_${item.media.file}`} alt={item.title} /></a></Link>)}</div><div className="meta"><span className="time">среднее время прочтения - 2 минуты</span></div></div><div className="desc"><h3><Link href="/[taxonomy]/[post]" as={`/${taxonomy.slug}/${item.slug}`}><a title={item.title}>{item.title}</a></Link></h3><div className="excerpt" dangerouslySetInnerHTML={{ __html: item.excerpt }} /></div></div></BoxWrap> */

/* taxonomy.slug === 'encyclopedia'
		? `<p>В разделе «Энциклопедия» вы узнаете, что такое <strong>рассеянный склероз</strong> и с чем приходится сталкиваться <strong>больным</strong>. А также выясните основные <strong>причины</strong> заболевания.</p><p>Ознакомитесь с <strong>симптомами рассеянного склероза</strong>, направлениями <strong>диагностики</strong> и найдете информацию о различиях течения болезни у мужчин и <strong>женщин</strong>.</p><p>Кроме того, вы узнаете о формах и <strong>стадиях</strong> заболевания <strong>рассеянный склероз</strong>. Увидите механизм развития болезни в организме.</p>`
		: taxonomy.slug === 'therapy'
		? `<p>Особое место в <strong>терапии рассеянного склероза</strong> занимают <strong>интерферон бета-1b</strong> и <strong>глатирамера ацетат</strong>. Вы сможете узнать о механизме действия этих лекарств. Необходимый вид терапии определит Ваш лечащий врач.</p><p>Наряду с этим, вы ознакомитесь с немедикаментозными <strong>(народными) методами лечения рассеянного склероза</strong>. Выясните, как здоровый образ жизни, различные методы реабилитации и психотерапии, а также физическая активность способны предупредить <strong>обострения</strong> и облегчить некоторые <strong>симптомы рассеянного склероза</strong>.</p>`
		: taxonomy.slug === 'lifestyle'
		? `<p>Здоровый образ <strong>жизни</strong> и современная терапия позволяют жить больным <strong>с рассеянным склерозом</strong> столько же, <strong>сколько</strong> и здоровым людям.</p><p>Особое внимание и забота необходимы детям и подросткам, столкнувшимся с рассеянным склерозом. Часто детям требуется психологическая помощь, дополнительные занятия для улучшения памяти и мышления. В рубрике  «Гид для родителя»  вы найдете информацию об особенностях <strong>течения рассеянного склероза</strong> у детей. Узнаете, как улучшить познавательные способности, помочь ребенку в школе и общении со сверстниками. А также, как рассказать ребенку о диагнозе рассеянный склероз, оказать психологическую поддержку и многое другое.</p>`
		: taxonomy.slug === 'vosproizvedennye-pitrs'
		? `<p>Лекарственные препараты, часто называемые "аналогами" оригинальных препаратов, являются воспроизведенными или биоаналоговыми.</p><p>В данном разделе собраны полезные статьи об оригинальных, воспроизведенных лекарственных препаратах и биоаналогах, которые применяются в лечении рассеянного склероза.</p>`
		: `` */
