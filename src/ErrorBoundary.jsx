import React,{ Component } from 'react'

class ErrorBoundary extends Component {
	state = {
		hasError: false
	}

	static getDerivedStateFromError(error) { }

	componentDidCatch(error, errorMsg) {
		this.setState({
			hasError: true,
			error,
			errorMsg
		})
		console.log('ERROR ', error , errorMsg)
	}

	render() {
		if (this.state.hasError) {			
			return (
				<div>
					<h2>Somthing went wrong</h2>
				</div>
			)
		}
		return this.props.children;
	}
}

export default ErrorBoundary