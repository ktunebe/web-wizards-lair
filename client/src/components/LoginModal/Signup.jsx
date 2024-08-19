import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import { useMutation } from '@apollo/client'
import { ADD_PROFILE } from '../../utils/mutations'
import { Description, Field, Input, Label, Button } from '@headlessui/react'
import clsx from 'clsx'

import Auth from '../../utils/auth'
import AvatarBank from './AvatarBank'

const Signup = ({ isOpen, setIsOpen }) => {
	const [selectedAvatar, setSelectedAvatar] = useState('')
	const [formState, setFormState] = useState({
		username: '',
		email: '',
		password: '',
		avatar: '',
	})
	const [addUser, { error, data }] = useMutation(ADD_PROFILE)

	// Handle when you click on an avatar to select it (will run onClick of any avatar image)
	const handleSelectAvatar = (e) => {
		const avatarUrl = e.target.getAttribute('src')

		// Update selectedAvatar first
		setSelectedAvatar(avatarUrl)

		// Use the callback form of setFormState to ensure you have the latest state
		setFormState((prevState) => ({
			...prevState,
			avatar: avatarUrl,
		}))
	}

	useEffect(() => {
		console.log(formState)
	}, [formState])

	// update state based on form input changes
	const handleChange = (event) => {
		const { name, value } = event.target

		setFormState({
			...formState,
			[name]: value,
		})
	}

	const handleCancel = () => {
		setIsOpen(false)
	}

	// submit form
	const handleFormSubmit = async (event) => {
		event.preventDefault()
		console.log(formState)

		try {
			const { data } = await addUser({
				variables: { ...formState },
			})

			Auth.login(data.addUser.token)
		} catch (e) {
			console.error(e)
		}
	}

	return (
		<>
						{data ? (
							<p>
								Success! You may now head{' '}
								<Link to="/">back to the homepage.</Link>
							</p>
						) : (
							<form onSubmit={handleFormSubmit} className="bg-lannisterRed text-white border-4">
								<div className="w-full py-4 px-12">
								<Field className="py-4">
									<Label className="text-sm/6 font-medium text-white">Username</Label>
									<Input
										placeholder="Your username"
										name="username"
										type="username"
										value={formState.username}
										onChange={handleChange}
										className={clsx(
											'bg-jet text-white block w-full rounded border-neutral-200 border-2 py-1.5 px-3 text-sm/6',
											'placeholder:text-white focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
										)}
									/>
								</Field>
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
											'placeholder:text-white focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
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
											'placeholder:text-white focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
										)}
									/>
								</Field>
								{/* Imported from AvatarBank.jsx */}
									<AvatarBank
										selectedAvatar={selectedAvatar}
										setSelectedAvatar={setSelectedAvatar}
										handleSelectAvatar={handleSelectAvatar}
									/>
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
						)}

						{error && (
							<div className="my-3 p-3 bg-danger text-white">
								{error.message}
							</div>
						)}
</>
	)
}

export default Signup
