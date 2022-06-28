import Link from './Link'
import Drawer from './Drawer'

export const MenuItem = ({ name, link, onClick, children = [], ...props }) => {
	const dropdown = children?.length > 0 ? `dropdown` : ''
	return (
		<li>
			<Link {...link}>
				<a className={dropdown} onClick={onClick}>
					{name}
				</a>
			</Link>
			<MenuDropdown data={children} onClick={onClick} />
		</li>
	)
}

export const MenuDropdown = ({ data = [], onClick }) => {
	if (!data.length) return ''
	return (
		<div className="dropdown-nav">
			<ul>
				{data.map((sitem, i) => (
					<li key={i}>
						<Link {...sitem.link}>
							<a onClick={onClick}>{sitem.name}</a>
						</Link>
					</li>
				))}
			</ul>
		</div>
	)
}

export const MenuDrawer = ({ visible, close, list = [], children, ...props }) => {
	return (
		<Drawer className="drawer-menu" visible={visible} onClose={close} {...props}>
			<div className="menu-inner">
				<Link href="/">
					<a className="logo" title="" />
				</Link>
				<Menu className="menu-list" list={list} onClick={close} />
			</div>
			{children}
		</Drawer>
	)
}

const Menu = ({ list = [], ...props }) => {
	const { className, onClick } = props
	return (
		list.length > 0 && (
			<ul className={`row menu ${className ? className : ''}`}>
				{list.map((item, i) => (
					<MenuItem key={i} {...item} onClick={onClick} />
				))}
			</ul>
		)
	)
}

export default Menu
