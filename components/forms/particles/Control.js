import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Select, Checkbox } from './'

const FormControl = ({ type, required, name, value, options, placeholder, className, onChange, onValid, children, ...props }) => {
	return (
		<div className={classNames('row-control', `row-${name}`, { req: required })}>
			{type === 'textarea' ? (
				<textarea value={value} placeholder={placeholder} onChange={onChange(type, name)} className={classNames(`${name}`, className, onValid && onValid(name))}></textarea>
			) : type === 'select' ? (
				<Select size="large" id={name} options={options} value={value} placeholder={placeholder} onChange={onChange(type, name)} optionLabelProp="value" allowClear />
			) : type === 'checkbox' ? (
				<Checkbox checked={value} onClick={onChange(type, name)}>
					{children}
				</Checkbox>
			) : (
				<input
					type="text"
					value={value}
					placeholder={placeholder}
					onChange={onChange(type, name)}
					className={classNames(`inp-icon ${name}`, className, onValid && onValid(name))}
				/>
			)}
		</div>
	)
}

FormControl.propTypes = {
	type: PropTypes.oneOf(['text', 'textarea', 'select', 'checkbox']),
	placeholder: PropTypes.string,
	required: PropTypes.bool,
	options: PropTypes.array,
	onChange: PropTypes.func,
	onValid: PropTypes.func
}
FormControl.defaultProps = {
	type: 'text',
	required: false,
	placeholder: 'Начните вводить текст',
	options: []
}

export default FormControl
