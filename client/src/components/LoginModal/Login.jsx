import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import { LOGIN_USER } from '../../utils/mutations'
import { Description, Field, Input, Label, Button } from '@headlessui/react'
import clsx from 'clsx'

import Auth from '../../utils/auth'

const Login = ({ isOpen, setIsOpen }) => {
	const [formState, setFormState] = useState({ email: '', password: '' })
	const [login, { error, data }] = useMutation(LOGIN_USER)

	// update state based on form input changes
	const handleChange = (event) => {
		const { name, value } = event.target

		setFormState({
			...formState,
			[name]: value,
		})
	}

	// submit form
	const handleFormSubmit = async (event) => {
		event.preventDefault()
		console.log(formState)
		try {
			const { data } = await login({
				variables: { ...formState },
			})

			Auth.login(data.login.token)
		} catch (e) {
			console.error(e)
		}

		// clear form values
		setFormState({
			email: '',
			password: '',
		})
	}

	const handleCancel = () => {
		setIsOpen(false)
	}

	return (
		<form onSubmit={handleFormSubmit} className="bg-lannisterRed text-white border-4">
			<div className="w-full py-4 px-12">
				<Field className="py-4">
					<Label className="text-sm/6 font-medium text-white">Email</Label>
					<Input
						placeholder="Your email"
						name="email"
						type="email"
						value={formState.email}
						onChange={handleChange}
						className={clsx(
							'bg-jet text-white block w-full rounded border-neutral-200 border-2 py-1.5 px-3 text-sm/6',
							'placeholder:text-lightGray focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
						)}
					/>
				</Field>
				<Field className="py-4">
					<Label className="text-sm/6 font-medium text-white">Password</Label>
					<Input
						placeholder="******"
						name="password"
						type="password"
						value={formState.password}
						onChange={handleChange}
						className={clsx(
							'bg-jet text-white block w-full rounded border-neutral-200 border-2 py-1.5 px-3 text-sm/6',
							'placeholder:text-lightGray focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
						)}
					/>
				</Field>
				<div className="flex flex-wrap justify-center lg:justify-end gap-4 my-6">
					<Button 
						className="rounded bg-lannisterGold py-2 px-4 text-sm border-2 text-white data-[hover]:bg-jet data-[active]:bg-jet"
						type="submit"
					>
						Submit
					</Button>
					<Button 
						className="rounded bg-lannisterGold py-2 px-4 text-sm border-2 text-white data-[hover]:bg-jet data-[active]:bg-jet"
						onClick={handleCancel}
					>
						Cancel
					</Button>
				</div>
			</div>
		</form>
	)
}

export default Login
