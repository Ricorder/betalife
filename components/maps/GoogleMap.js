import PropTypes from 'prop-types'
import classNames from 'classnames'
import GoogleMapReact from 'google-map-react'

import { useEffect, useState } from 'react'
import { Select } from 'antd'

import mapstyle from 'core/context/mapstyle'
import { onFilterByParam } from 'core/utils/form'

import MapSingle from './MapSingle'
import { Section, BoxWrap } from 'components/common'

const getLists = (params = []) => {
	const _result = { cities: [], types: [] }
	const _arrkey = [
		{ key: 'type', res: 'types' },
		{ key: 'city', res: 'cities' }
	]
	if (params?.length > 0) {
		_arrkey.map((a) => {
			const data = params.find((p) => p.key === a.key)?.data || []
			_result[a.res] = [...data.map((b) => ({ label: b.label, value: b.value }))]
		})
	}
	return { ..._result }
}

const GoogleMap = ({ title, params, data }) => {
	const [records, setRecords] = useState(data || [])
	const [markers, setMarkers] = useState(data || [])

	const [marker, setMarker] = useState('')
	const [lists, setLists] = useState({ cities: [], types: [] })
	const { cities, types } = lists

	const [mapstate, setMapState] = useState({ center: { lat: 55.7, lng: 37.6 }, zoom: 5 })
	const { center, zoom } = mapstate

	const [values, setValues] = useState({ visible: false, modview: 'map', city: undefined, type: undefined, search: '' })
	const { modview, visible, city, type, search } = values

	useEffect(() => {
		if (params?.length) {
			setLists({ ...lists, ...getLists(params) })
		}
		if (data.length > 0) {
			// console.log(`params, data:`, JSON.stringify({ params, data: data?.length && data[0] }, null, 2))
			setMarkers(data)
			setRecords(data)
		}
	}, [])

	useEffect(() => {
		onFiltering()
	}, [city, type, search])

	const showDrawer = (data) => {
		if (!data) return
		setMarker(data)
		setValues({ ...values, visible: true })
	}

	const onChangeInput = (type, name) => (e) => {
		const value = type === 'checkbox' ? e.target.checked : e.target.value
		setValues({ ...values, [name]: value })
	}

	const onChangeSelect = (name) => (value, label) => setValues({ ...values, [name]: value })

	const onChangeCity = (city) => setValues({ ...values, visible: false, modview: 'map', city: city })

	const getCoordinates = (arr) => {
		if (!arr.length) return
		const center = { lat: parseFloat(arr[0].fields?.lat), lng: parseFloat(arr[0].fields?.lng) }
		if (center) setMapState({ ...mapstate, center, zoom: 10 })
	}

	const onFiltering = () => {
		if (!records?.length) return
		const docsSearch = records.filter((item) => {
			return onFilterByParam('city', city, item) && onFilterByParam('type', type, item) && onFilterByParam('search', search, item)
		})
		setMarkers(docsSearch)
		getCoordinates(docsSearch)
		setValues({ ...values, visible: false, modview: 'map' })
	}

	const onReset = () => {
		setMapState({ ...mapstate, center: { lat: 55.7, lng: 37.6 }, zoom: 5 })
		setValues({ ...values, modview: 'map', city: undefined, type: undefined, search: '' })
	}

	const showModview = () => {
		const mvdata = [
			{ key: 'map', icon: 'map-marked-alt', name: 'Картой' },
			{ key: 'list', icon: 'bars', name: 'Списком' }
		]
		return (
			<div className="row modviews icnsonly">
				{mvdata.map((a) => (
					<button
						key={a.key}
						aria-label={a.name}
						className={classNames(`button grey mv-${a.key}`, { active: modview === a.key })}
						onClick={() => setValues({ ...values, modview: a.key })}>
						<i className={`fas fa-${a.icon}`} />
						{/* {a.name} */}
					</button>
				))}
			</div>
		)
	}

	const showGoogleMap = () => {
		const Marker = ({ data }) => {
			const classes = classNames('marker', `marker-icon-${data?.fields?.type?.join('-')}`, { active: visible && data.slug === marker?.slug })
			return <div className={classes} onClick={() => showDrawer(data)}></div>
		}
		return (
			<div className="gmap">
				<GoogleMapReact {...gMapProps}>
					{markers.map((a, i) => (
						<Marker key={i} lat={a.fields.lat} lng={a.fields.lng} data={a} />
					))}
				</GoogleMapReact>
				<div className="bottom">Перечень лечебных учреждений не является исчерпывающим. Информация периодически обновляется.</div>
			</div>
		)
	}

	const showRecords = () => {
		return modview === 'map' ? (
			showGoogleMap(true)
		) : (
			<Section className="modview-list">
				{markers.map((m, i) => {
					const { city, doctor, address, site, phones, email, representative } = m?.fields

					return (
						<div key={i} className="item">
							<div className="item-inner">
								<h2>
									{m.title}
									<button className="button white" title="Посмотреть на карте" onClick={() => onChangeCity(city.value)}>
										<i className="fa fa-map-marked-alt" />
									</button>
								</h2>
								<div className="desc">
									{doctor && (
										<p className="doctor">
											<b>Врач:</b> {doctor}
										</p>
									)}
									{representative && (
										<p className="doctor">
											<b>Представитель:</b> {representative}
										</p>
									)}
									{address && (
										<p className="address">
											<b>Адрес:</b>
											{address}
										</p>
									)}
									{site && (
										<p className="site">
											<b>Сайт:</b>
											<a href={site} target="_blank" rel="noopener noreferrer">
												{site}
											</a>
										</p>
									)}
									{phones.length > 0 && (
										<p className="phones">
											<b>Телефон:</b>
											{phones?.map((a, k) => (
												<a key={k} href={`tel:${a.phone}`}>
													{a.phone}
												</a>
											))}
										</p>
									)}
									{email && (
										<p className="email">
											<b>E-mail:</b>
											<a href={`mailto:${email}`}>{email}</a>
										</p>
									)}
								</div>
							</div>
						</div>
					)
				})}
			</Section>
		)
	}

	const gMapProps = {
		bootstrapURLKeys: { language: 'ru', key: 'AIzaSyCh_rgalDNcLPTGKMuT9ANnuc5yLkO3E0E' },
		options: { ...mapstyle },
		defaultZoom: 5,
		center,
		zoom
	}

	return (
		<section className="googlemap">
			<Section className="gm-heading">
				<div className="gm-title">
					<i className="ps icon" />
					<h2>{title}</h2>
				</div>

				<BoxWrap className="gm-search size-s">
					{showModview()}

					<div className="row selects c3">
						<input type="text" className="inp" value={search} onChange={onChangeInput('string', 'search')} placeholder="Искать по названию учреждения, врачу" />
						<Select allowClear options={cities} value={city} placeholder="Город" onChange={onChangeSelect('city')} />
						<Select allowClear options={types} value={type} placeholder="Тип учреждения" onChange={onChangeSelect('type')} />
					</div>

					<button className={classNames(`button grey reset`, { active: city || type })} onClick={onReset}>
						<i className="fa fa-trash" />
					</button>
				</BoxWrap>
			</Section>

			{showRecords()}

			<MapSingle visible={visible} onChange={onChangeCity} onClose={() => setValues({ ...values, visible: false })} data={marker} />
		</section>
	)
}

GoogleMap.propTypes = {
	title: PropTypes.any,
	params: PropTypes.array,
	data: PropTypes.array
}

GoogleMap.defaultProps = {
	title: 'Карта медицинских учреждений',
	params: [],
	data: []
}

export default GoogleMap
