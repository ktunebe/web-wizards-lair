import {
	ApolloClient,
	InMemoryCache,
	ApolloProvider,
	createHttpLink,
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { Outlet } from 'react-router-dom'

import Header from './components/Header'
import Footer from './components/Footer'

const httpLink = createHttpLink({
	uri: '/graphql',
})

const authLink = setContext((_, { headers }) => {
	// get the authentication token from local storage if it exists
	const token = localStorage.getItem('id_token')
	// return the headers to the context so httpLink can read them
	return {
		headers: {
			...headers,
			authorization: token ? `Bearer ${token}` : '',
		},
	}
})

const client = new ApolloClient({
	link: authLink.concat(httpLink),
	cache: new InMemoryCache(),
})

function App() {
	return (
		<ApolloProvider client={client}>
			<div className="flex flex-col justify-start min-100-vh">
				<Header />
				<div
					className="flex flex-col align-center justify-between"
					style={{ flex: 1, overflowY: 'auto' }}>
					<Outlet />
				</div>
				<Footer />
			</div>
		</ApolloProvider>
	)
}

export default App
