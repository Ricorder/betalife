export default [
	{
		name: 'Энциклопедия',
		desc: `Рассеянный склероз — аутоиммунное заболевание, поражающее оболочку нервных волокон. Болезнь может начаться внезапно.`,
		link: { href: '/[taxonomy]', as: '/encyclopedia#head' },
		menu: ['main', 'drawer']
	},
	{
		name: 'Терапия РС',
		desc: `В разделе «Терапия рассеянного склероза» вы узнаете о правилах терапии рассеянного склероза. Ознакомитесь с основными направлениями лечения и базовой информацией о ПИТРС.`,
		link: { href: '/[taxonomy]', as: '/therapy#head' },
		menu: ['main', 'drawer']
	},
	{
		name: 'Образ жизни',
		desc: `В разделе «Образ жизни» вы найдете советы, которые помогут чувствовать себя хорошо и вести активный образ жизни, несмотря на тяготы рассеянного склероза.`,
		link: { href: '/[taxonomy]', as: '/lifestyle#head' },
		menu: ['main', 'drawer']
	},
	{
		name: 'Воспроизведенные ПИТРС',
		desc: `В данном разделе собраны полезные статьи об оригинальных, воспроизведенных лекарственных препаратах и биоаналогах, которые...`,
		link: { href: '/[taxonomy]', as: '/vosproizvedennye-pitrs#head' },
		menu: ['drawer']
	},
	{
		name: 'Полезное',
		desc: `Раздел «Полезное» содержит информацию о фармаконадзоре за лекарственными средствами. Здесь вы можете сообщить о нежелательной реакции при применении препарата, выпущенного компанией BIOCAD.`,
		link: { href: '/services', as: null },
		menu: ['main', 'drawer'],
		children: [
			{ name: 'BIOCAD', link: { href: '/services/biocad', as: null } },
			{ name: 'Новости', link: { href: '/[taxonomy]', as: '/news' } },
			{ name: 'Вопрос-ответ', link: { href: '/question-answer', as: null } },
			{ name: 'Глоссарий', link: { href: '/services/glossary', as: null } },
			{ name: 'Библиотека', link: { href: '/services/library', as: null } },
			{ name: 'Фармаконадзор', link: { href: '/services/farmakonadzor', as: null } },
			{ name: 'Центры рассеянного склероза', link: { href: '/services/hospitals', as: null } },
			{ name: 'Приложение BetaLife', link: { href: '/services/app', as: null } }
		]
	},
	{
		name: 'Лекторий',
		desc: `Сервис, позволяющий принять участие в вебинарах со специалистами, узнать полезную информацию о рассеянном склерозе, посмотреть лекции.`,
		link: { href: '/events', as: null },
		menu: ['main', 'drawer']
	},
	{
		name: 'Эксперты',
		desc: `Эффективные методики для поддержания здоровья при рассеянном склерозе.`,
		link: { href: '/experts', as: null },
		menu: ['main', 'drawer']
	}
]
