export default {
	styles: [
		{
			featureType: 'all',
			elementType: 'all',
			stylers: [{ saturation: '-100' }, { lightness: '0' }, { hue: '#ffa300' }]
		},
		{ featureType: 'administrative.locality', elementType: 'labels.text.fill', stylers: [{ color: '#ac9b83' }] },
		{
			featureType: 'landscape.natural.landcover',
			elementType: 'labels.text.fill',
			stylers: [{ saturation: '30' }, { lightness: '0' }]
		},
		{ featureType: 'landscape.natural.terrain', elementType: 'geometry', stylers: [{ visibility: 'simplified' }] },
		{ featureType: 'poi', elementType: 'all', stylers: [{ saturation: '-40' }] },
		{ featureType: 'road', elementType: 'geometry.fill', stylers: [{ lightness: '-5' }] },
		{ featureType: 'road.highway', elementType: 'geometry', stylers: [{ visibility: 'simplified' }] },
		{
			featureType: 'road.highway',
			elementType: 'labels.text',
			stylers: [{ visibility: 'on' }, { saturation: '-100' }]
		},
		{ featureType: 'road.arterial', elementType: 'geometry', stylers: [{ visibility: 'simplified' }] },
		{ featureType: 'road.arterial', elementType: 'geometry.fill', stylers: [{ weight: '1' }] },
		{ featureType: 'transit.line', elementType: 'all', stylers: [{ visibility: 'off' }] },
		{ featureType: 'transit.station', elementType: 'all', stylers: [{ saturation: '-75' }, { lightness: '15' }] },
		{
			featureType: 'water',
			elementType: 'geometry.fill',
			stylers: [{ color: '#dad5cd' }, { lightness: '30' }, { saturation: '-75' }]
		},
		{ featureType: 'water', elementType: 'labels.text', stylers: [{ lightness: '-14' }, { saturation: '-46' }] }
	]
}
