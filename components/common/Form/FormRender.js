import React, { useState } from 'react'
import classNames from 'classnames'
// import { useForm } from 'react-hook-form'

export function Form({ defaultValues, children, onSubmit, className, ...props }) {
	// const { register, handleSubmit } = useForm({ defaultValues })
	const [values, setValues] = useState(defaultValues)

	// const onChangeEvent = (name) => (e) => setValues({ ...values, [name]: e.target.value })

	const setState = (type, name) => (e) => {
		console.log(`onState`, type, name, e.target.value)
		setValues({ ...values, [name]: e.target.value })
	}

	const onFormSubmit = async (e) => {
		e.preventDefault()
		onSubmit(values)
		return
	}

	return (
		<div className={classNames('formbox', className)}>
			<form onSubmit={onFormSubmit}>
				{Array.isArray(children)
					? children.map((child, i) => React.createElement(child.type, { ...{ ...child.props, key: child.props.name ?? `${child.type}_${i}` }, setState }))
					: children}
			</form>
		</div>
	)
}

export function Group({ children, ...rest }) {
	console.log(`Grout setState: `, typeof rest?.setState)
	return (
		<div className={classNames('row-group', { [`c${children.length}`]: children?.length })}>
			{Array.isArray(children)
				? children.map((child, i) => React.createElement(child.type, { ...{ ...child.props, key: child.props.name ?? `${child.type}_${i}` }, ...rest }))
				: children}
		</div>
	)
}

export function Input({ label, name, setState, ...props }) {
	return (
		<div className="form-row">
			<label htmlFor={name}>{label}</label>
			<input id={name} name={name} onChange={setState('input', name)} {...props} />
		</div>
	)
}

export function Select({ label, name, options, setState, ...props }) {
	return (
		<div className="form-row">
			<label htmlFor={name}>{label}</label>
			<select name={name} onChange={setState('select', name)} {...props}>
				{options.map((value) => (
					<option key={`${name}_${value}`} value={value}>
						{value}
					</option>
				))}
			</select>
		</div>
	)
}

export function Button({ children, ...rest }) {
	return <button className="button submit">{children}</button>
}
