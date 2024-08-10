import { useRef, useState, useEffect } from 'react'
import Auth from '../utils/auth'
import { Flex } from 'antd'
import LoginModal from '../components/LoginModal'

const doorStyles = {
	backgroundColor: 'black',
	borderRadius: '10px',
	overflow: 'hidden',
  position: 'relative' 
}
const initialFlameStyles = {
	outerColorG: 56,
	innerColorG: 217,
  rotate: 45
}

let intervalId

const Home = () => {
	const [flameStyles, setFlameStyles] = useState(initialFlameStyles)

	useEffect(() => {
		clearInterval(intervalId)
		intervalId = setInterval(() => {
			setFlameStyles({
				outerColorG: Math.floor(Math.random() * 90 + 160),
				innerColorG: Math.floor(Math.random() * 90 + 50),
        rotate: Math.floor(Math.random() * 8 - 45),
        blur: Math.floor(Math.random() * 8 + 15)
			})
		}, 150)
		return () => clearInterval(intervalId)
	}, [])
	return (
		<>
			<div
				className="flex-column justify-space-around container text-light text-center"
				style={{ height: '30vh' }}>
				<h2 className="">Welcome to the Web Wizard's Lair</h2>
				<p className="intro">
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi rem
					necessitatibus suscipit saepe porro deleniti dicta officia eius
					delectus consequuntur. Beatae saepe culpa, molestias autem explicabo
					aspernatur veritatis possimus officiis? Lorem ipsum dolor sit amet,
					consectetur adipisicing elit. Ab ipsam, itaque iusto culpa nihil
					quisquam ipsum impedit tenetur earum facilis natus aut, reprehenderit
					sint alias inventore maiores ea autem magni?
				</p>
			</div>
			<Flex
				justify="center"
				align="space-between"
				className="container"
				style={{ height: '40vh', width: '100%', }}>
				
				<Flex vertical align="center" className="col-2 h-75 align-self-end">
					<div
						className="outer-flame"
						style={{
							backgroundColor: `rgb(234, ${flameStyles.outerColorG}, 14)`,
              transform: `rotate(${flameStyles.rotate}deg)`,
              filter: `drop-shadow(5px -5px ${flameStyles.blur}px rgb(234, ${flameStyles.outerColorG}, 14))`
						}}>
						<div
							className="inner-flame"
							style={{
								backgroundColor: `rgb(234, ${flameStyles.innerColorG}, 14)`,
							}}></div>
					</div>
					<div className="sconce"></div>
				</Flex>
				<div style={doorStyles} className="col-8">
        {Auth.loggedIn() ? (
					<img
						src="/misc-images/archmage.png"
						className="absolute-middle"
						style={{
							height: '60%',
							transition: 'all 1.5s',
							// opacity: doorOpen ? '0%' : '100%',
						}}
					/>
				) : (
					<LoginModal />
				)}
					<img
						src="/misc-images/dungeon-gate-3.png"
						style={{
							width: '100%',
							height: '100%',
							transition: 'all 4s',
							// transform: 'translateY(-100%)',
						}}
					/>
				</div>
				<Flex vertical align="center" className="col-2 h-75 align-self-end">
					<div
						className="outer-flame"
						style={{
							backgroundColor: `rgb(234, ${flameStyles.outerColorG}, 14)`,
              transform: `rotate(${flameStyles.rotate}deg)`,
              filter: `drop-shadow(5px -5px ${flameStyles.blur}px rgb(234, ${flameStyles.outerColorG}, 14))`
						}}>
						<div
							className="inner-flame"
							style={{
								backgroundColor: `rgb(234, ${flameStyles.innerColorG}, 14)`,
							}}></div>
					</div>
					<div className="sconce"></div>
				</Flex>
			</Flex>
		</>
	)
}

export default Home
