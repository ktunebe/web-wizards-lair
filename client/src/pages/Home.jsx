import { useRef, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Auth from '../utils/auth'
import LoginModal from '../components/LoginModal'
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
console.log(Auth.getProfile())
const doorStyles = {
	backgroundColor: 'black',
	borderRadius: '10px',
	overflow: 'hidden',
	position: 'relative',
	height: '100%',
}

// intervalId to clear to avoid memory leak
let intervalId

const Home = () => {

	const { loading, data } = useQuery(QUERY_ME)
	const user = data?.me || {};

	const [flameStyles, setFlameStyles] = useState({})
	const [gameStarted, setGameStarted] = useState(false)
	const [doorOpened, setDoorOpened] = useState(false)
	const navigate = useNavigate()

	// Start Game Handler
	const handleStartGame = () => {
		setGameStarted(true)
		setTimeout(() => {
			setDoorOpened(true)
		}, 4000)
		setTimeout(() => {
			navigate('/editor-sandbox')
		}, 10000)
	}

	// Flame flicker interval
	useEffect(() => {
		clearInterval(intervalId)
		intervalId = setInterval(() => {
			setFlameStyles({
				outerColorG: Math.floor(Math.random() * 90 + 160),
				innerColorG: Math.floor(Math.random() * 90 + 50),
				rotate: Math.floor(Math.random() * 8 - 45),
				blur: Math.floor(Math.random() * 8 + 15),
			})
		}, 150)
		return () => clearInterval(intervalId)
	}, [])

	return (
		<>
			<div className="container flex flex-col justify-between text-light text-center">
				<h2 className="">Welcome to the Web Wizard's Lair</h2>
				<p className="intro" style={{fontSize: '1.5em', }}>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi rem
					necessitatibus suscipit saepe porro deleniti dicta officia eius
					delectus consequuntur. Beatae saepe culpa, molestias autem explicabo
					aspernatur veritatis possimus officiis? Lorem ipsum dolor sit amet,
					consectetur adipisicing elit. Ab ipsam, itaque iusto culpa nihil
					quisquam ipsum impedit tenetur earum facilis natus aut, reprehenderit
					sint alias inventore maiores ea autem magni?
				</p>
			</div>
			{/* Door/Torches/Avatar - may make own component */}
			<div className="w-full max-w-screen-xl flex content-between justify-center">
				{/* Left torch and avatar */}
				<div className="flex flex-col w-1/6 justify-between">
					<div className="flex flex-col items-center">
						<div
							className="outer-flame border-l-4 border-t-[6px] border-b-4 border-r-[6px] "
							style={{
								backgroundColor: `rgb(234, ${flameStyles.innerColorG}, 14)`,
								transform: `rotate(${flameStyles.rotate}deg)`,
								filter: `drop-shadow(5px -5px ${flameStyles.blur}px rgb(234, ${flameStyles.outerColorG}, 14))`,
								borderRadius: '80% 0 55% 50% / 55% 0 80% 50%',
								borderColor: `rgb(234, ${flameStyles.outerColorG}, 14)`,
							}}>
						</div>
						<div className="sconce"></div>
					</div>
					{Auth.loggedIn() ? (
						// Only show avatar once logged in
						<img
							src={user.avatar}
							className='w-3/4'
							style={{
								transition: 'all 4s',
								transform: gameStarted ? 'translateX(150%)' : '',
								zIndex: 5,
								// maxWidth: '100%',
								// maxHeight: '75%',
							}}
						/>
					) : (
						''
					)}
				</div>
				{/* Door Background - position: relative */}
				<div style={doorStyles} className="w-7/12">
					{/* Nested ternary */}
					{!Auth.loggedIn() ? (
						// Not logged in = LoginModal,
						<LoginModal />
					) : !gameStarted ? (
						// Logged in but game not started = start game button,
						<button
							onClick={handleStartGame}
							className={'btn btn-danger text-dark font-bold absolute-middle'}>
							Enter the Dungeon
						</button>
					) : (
						//  Logged in and game started = Josh, but invisible until door opens
						<img
							src="/misc-images/archmage.png"
							className="absolute-middle"
							style={{
								width: '40%',
								transition: 'all 1.5s',
								opacity: doorOpened ? '100%' : '0%',
							}}
						/>
					)}
					<img
						src="/misc-images/dungeon-gate-3.png"
						style={{
							width: '100%',
							height: '100%',
							transition: 'all 4s',
							transform: doorOpened ? 'translateY(-100%)' : '',
						}}
					/>
				</div>
				{/* Right torch */}
					<div className="flex flex-col items-center w-1/6">
						<div
							className="outer-flame border-l-4 border-t-[6px] border-b-4 border-r-[6px] "
							style={{
								backgroundColor: `rgb(234, ${flameStyles.innerColorG}, 14)`,
								transform: `rotate(${flameStyles.rotate}deg)`,
								filter: `drop-shadow(5px -5px ${flameStyles.blur}px rgb(234, ${flameStyles.outerColorG}, 14))`,
								borderRadius: '80% 0 55% 50% / 55% 0 80% 50%',
								borderColor: `rgb(234, ${flameStyles.outerColorG}, 14)`,
							}}>
						</div>
						<div className="sconce"></div>
					</div>
			</div>
		</>
	)
}

export default Home
