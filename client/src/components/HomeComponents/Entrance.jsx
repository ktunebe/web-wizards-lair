import { useRef, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Auth from '../../utils/auth'
import LoginModal from '../LoginModal'
import { Button } from '@headlessui/react'
import Torch from './Torch'

// intervalId to clear to avoid memory leak
let intervalId

const Entrance = ({ user }) => {
	const navigate = useNavigate()
	// Flame flicker state
	const [flameFlickers, setFlameFlickers] = useState({})
	// Door Open/Game Start state
	const [gameStarted, setGameStarted] = useState(false)
	const [doorOpened, setDoorOpened] = useState(false)
	// Flame flicker interval
	useEffect(() => {
		clearInterval(intervalId)
		intervalId = setInterval(() => {
			setFlameFlickers({
				outerColorG: Math.floor(Math.random() * 90 + 160),
				innerColorG: Math.floor(Math.random() * 90 + 50),
				rotate: Math.floor(Math.random() * 8 - 45),
				blur: Math.floor(Math.random() * 8 + 15),
			})
		}, 150)
		return () => clearInterval(intervalId)
	}, [])

	// Start Game Handler
	const handleStartGame = () => {
		setGameStarted(true)
		setTimeout(() => {
			setDoorOpened(true)
		}, 3000)
		setTimeout(() => {
			navigate('/editor-sandbox')
		}, 9000)
	}

	return (
		<>
			{/* Door/Torches/Avatar */}
			<div className="mt-6 w-full max-w-screen-xl flex content-between justify-center">
				{/* Left torch and avatar */}
				<div className="flex flex-col w-1/6 justify-between">
					<Torch flameFlickers={flameFlickers} />
					{Auth.loggedIn() ? (
						// Only show avatar once logged in
						<img
							src={user.avatar}
							alt="user avatar image"
							className={`w-3/4 transition-all duration-[3s] z-10 ${
								gameStarted ? 'translate-x-[150%]' : ''
							}`}
						/>
					) : (
						''
					)}
				</div>
				{/* Door Background - position: relative */}
				<div className="relative h-full w-7/12 bg-black rounded-lg overflow-hidden">
					{/* Nested ternary */}
					{!Auth.loggedIn() ? (
						// Not logged in = LoginModal,
						<LoginModal />
					) : !gameStarted ? (
						// Logged in but game not started = start game button,

						<Button
							className="absolute-middle rounded bg-lannisterRed py-2 px-4 text-sm border-2 border-lannisterGold text-lannisterGold data-[hover]:bg-jet data-[hover]:text-lannisterRed data-[hover]:border-lannisterRed transition-colors ease-in-out duration-500"
							onClick={handleStartGame}>
							Enter the Dungeon
						</Button>
					) : (
						//  Logged in and game started = Josh, but invisible until door opens
						<img
							src="/misc-images/archmage.png"
							alt="image of arch-mage"
							className={`absolute-middle w-2/5 transition-opacity duration-[3s] delay-[2s] ${
								doorOpened ? 'opacity-100' : 'opacity-0'
							}`}
						/>
					)}
					<img
						src="/misc-images/dungeon-gate-3.png"
						alt="image of a dungeon gate"
						className={`w-full h-full transition-all duration-[3s] ${
							doorOpened ? '-translate-y-full' : ''
						}`}
					/>
				</div>
				{/* Right torch */}
				<div className="flex flex-col w-1/6 justify-between">
					<Torch flameFlickers={flameFlickers} />
				</div>
			</div>
		</>
	)
}

export default Entrance
