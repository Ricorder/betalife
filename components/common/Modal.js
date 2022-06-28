import { Modal as AntdModal } from 'antd'

const Modal = ({ children, ...props }) => {
	return (
		<AntdModal closable centered className="modal-notice" width={false} {...props}>
			{children}
		</AntdModal>
	)
}

export default Modal
