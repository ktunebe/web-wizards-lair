import { useRef, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Auth from '../utils/auth'
import LoginModal from '../components/LoginModal'
import { useQuery } from '@apollo/client'
import { QUERY_ME } from '../utils/queries'
import Entrance from '../components/HomeComponents/Entrance'


const Home = () => {
	const { loading, data } = useQuery(QUERY_ME)
	const user = data?.me || {}

	return (
		<>
			<div className="container flex flex-col justify-between text-center font-pressStart">
				<h2 className="py-4 text-xl sm:text-2xl md:text-3xl text-white"
					style={{textShadow: '3px 3px 1px black'}}
				>
					Welcome to the Web Wizard's Lair
				</h2>
				<p className="py-4 sm:text-sm lg:text-base text-white bg-black/65">
					Greetings, Wayward Traveler, <br />
					<br />
					Welcome to the shadows of my domain, where the arcane and the digital
					intertwine in mysterious harmony. Here, amidst the tangled webs of
					code and the cryptic incantations of JavaScript, you shall find both
					peril and power.
					<br />
					<br />
					Beware: The path is fraught with pitfalls, where broken links lurk and
					deprecated functions await to ensnare the unwary. Errors will rise
					like phantoms, and bugs may twist and writhe in the dark corners of
					your code.
					<br />
					<br />
					But fear not, for within these shadowed halls lie the tools to master
					the craft — debuggers, version control, and frameworks of great potency.
					Harness them wisely, for in this dungeon of web development, knowledge
					is your greatest ally.
					<br />
					<br />
					Tread carefully, and may your code ever be free of maledictions.
				</p>
			</div>
			<Entrance
				user={user}
			/>
		</>
	)
}

export default Home
