import { Form, Input, Select, Button, Group } from './FormRender'

const FormComponent = () => {
	const onSubmit = (data) => {
		console.log(`form submit:`, JSON.stringify(data, null, 2))
	}

	return (
		<Form onSubmit={onSubmit} defaultValues={{ name: '', email: '', gender: '' }}>
			<Group>
				<Input name="name" label="Ваше ФИО:" />
				<Input name="email" label="Ваш Email:" />
			</Group>

			<Select name="gender" label="Ваша стать:" options={['female', 'male', 'other']} />

			<Button type="submit">Submit</Button>
		</Form>
	)
}

export default FormComponent
