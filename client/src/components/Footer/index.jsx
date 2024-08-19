 const Footer = () => {
	return (
		<footer className="bg-neutral-900 w-full text-light text-base p-4">
			<div className="container text-center">
				<h4 className="py-1">&copy; {new Date().getFullYear()}</h4>
				<a className="py-1 text-lannisterRed underline" href="https://github.com/ktunebe/project-3-cowabunga">GitHub Repo</a>
			</div>
		</footer>
	)
}

export default Footer
