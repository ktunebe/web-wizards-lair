import { Navigate, useParams, useNavigate } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { Button } from '@headlessui/react'

import { QUERY_SINGLE_USER, QUERY_ME, GET_ALL_PROBLEMS } from '../utils/queries'

import Auth from '../utils/auth'

const Profile = () => {
	const { data: problemData, loading: problemLoading } =
		useQuery(GET_ALL_PROBLEMS)
	const { userId } = useParams()

	const navigate = useNavigate()

	// If there is no `userId` in the URL as a parameter, execute the `QUERY_ME` query instead for the logged in user's information
	const { loading, data } = useQuery(userId ? QUERY_SINGLE_USER : QUERY_ME, {
		variables: { userId },
	})

	// Check if data is returning from the `QUERY_ME` query, then the `QUERY_SINGLE_PROFILE` query
	const user = data?.me || data?.user || {}

	// Use React Router's `<Redirect />` component to redirect to personal user page if username is yours
	if (Auth.loggedIn() && Auth.getProfile().data._id === userId) {
		return <Navigate to="/me" />
	}

	if (loading || problemLoading) {
		return <div>Loading...</div>
	}

	if (!user?.username) {
		return (
			<h4>
				You need to be logged in to see your user page. Use the navigation links
				above to sign up or log in!
			</h4>
		)
	}

	const userProgress = user.score - 1
	const totalProblems = problemData.problems.length

	return (
		<div>
			<div className="container nes-container with-title text-white is-centered">
				<p className="title nes-text !bg-jet " style={{ fontSize: '2rem' }}>
					{user.username}
				</p>
				<div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
					<img
						className="nes-container is-rounded w-1/2 sm:w-1/3"
						src={user.avatar}
						alt="user avatar image"></img>
					<div className="flex flex-col w-3/4 sm:w-2/3">
						<h2 className="py-2 text-base sm:text-xl md:text-2xl">
							Dungeon Levels Conquered: {userProgress}
						</h2>
						<progress
							className="nes-progress is-success"
							value={userProgress}
							max={totalProblems}></progress>
					</div>
				</div>
				<div>
					<h2 className="text-yellow-300 text-3xl underline mt-6 flex items-center justify-center gap-4">
						<i className="nes-icon trophy is-medium"></i>
						Solutions
						<i className="nes-icon trophy is-medium"></i>
					</h2>
					<ul className="py-6">
						{user.solutions?.map((solution, index) => {
							return (
								<li key={index} className="py-4 flex items-center border-y">
									<h3 className="text-xl sm:text-2xl">
										{solution.problem.title}
									</h3>
									<p className="sm:text-base py-4 text-left whitespace-pre-wrap">
										{solution.solution}
									</p>
								</li>
							)
						})}
					</ul>
				</div>
			</div>
			<div className="text-center py-6">
				<Button
					className="rounded bg-lannisterRed my-4 py-2 px-8 text-sm text-center border-2 border-lannisterGold text-lannisterGold data-[hover]:text-white data-[hover]:border-white data-[active]:bg-jet transition-colors duration-300 ease-in-out"
					onClick={() => navigate('/editor-sandbox')}>
					&larr; Back to Current Level
				</Button>
			</div>
		</div>
	)
}

export default Profile
