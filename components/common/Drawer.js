import { Drawer as AntdDrawer } from 'antd'

const Drawer = ({ children, ...props }) => {
	return (
		<AntdDrawer closable placement="left" width={false} footer={null} title={null} {...props}>
			{children}
		</AntdDrawer>
	)
}
export default Drawer
