import { Drawer } from 'antd'
import { Link } from 'components/common'

export default function NavDrawer({ visible = false, close = null, list = [] }) {
	const subMenu = (data) => {
		if (!data.length) return
		return (
			<div className="dropdown-nav">
				<ul>
					{data?.map((item, i) => (
						<li key={i}>
							<Link {...item.link}>
								<a onClick={close}>{item.name}</a>
							</Link>
						</li>
					))}
				</ul>
			</div>
		)
	}

	return (
		<Drawer
			closable
			width={false}
			title={null}
			footer={null}
			onClose={close}
			visible={visible}
			placement="right"
			getContainer={true}
			className="drawer-menu"
			closeIcon={<i className="fas fa-chevron-left" />}>
			<div className="menu-inner">
				<Link href="/">
					<a className="logo" />
				</Link>
				{list?.length > 0 && (
					<ul className="menu-list">
						{list
							.filter((a) => a.menu.includes('drawer'))
							.map((a, i) => (
								<li key={i}>
									<Link {...a.link}>
										<a className={a?.children?.length > 0 ? `dropdown` : ''} onClick={close}>
											<span>{a.name}</span>
											{a.desc.length > 0 && <p className="desc" dangerouslySetInnerHTML={{ __html: a.desc }} />}
										</a>
									</Link>
									{a?.children && subMenu(a.children)}
								</li>
							))}
					</ul>
				)}
			</div>
		</Drawer>
	)
}
