import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";

import { addNewUser } from 'Actions/register'

class RegisterPage extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			user: {
				firstName: '',
				lastName: '',
				username: '',
				password: ''
			},
			submitted: false
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	componentDidMount() {
		const { loginStatus, data } = this.props
		const emailId = data && data.loginId
		const { user } = this.state;
		this.setState({
			user: {
				...user,
				username: emailId
			},
			neededToLoad: true
		})
		let userData = {}
		if (typeof (Storage) !== "undefined") {
			userData = JSON.parse(sessionStorage.getItem("userData"));
		}
		const { loginId } = userData || {}
		if (loginId) {
			this.setState({
				neededToLoad: false
			});
			window.location = '/'
		}
	}
	shouldComponentUpdate(nextProps, nextState) {
		if (!this.state.neededToLoad) {
			return false;
		}
		return true;
	}

	handleChange(event) {
		const { name, value } = event.target;
		const { user } = this.state;
		this.setState({
			user: {
				...user,
				[name]: value
			}
		});
	}

	handleSubmit(event) {
		event.preventDefault();

		this.setState({ submitted: true });
		const { user } = this.state;
		console.log(user)
		this.props.addNewUser({ userDocument: user });
	}

	render() {
		const { user, submitted } = this.state;
		const { loginStatus } = this.props

		return (
			<div className="pr-15 pl-15">
				<div className='flex flex-middle flex-between'>
					<h2>Register</h2>
					<Link to="/login" className="btn btn-link"> LogIn</Link>
				</div>

				<form name="form" onSubmit={this.handleSubmit}>

					<div className={'mb-15' + (submitted && !user.firstName ? ' has-error' : '')}>
						<label htmlFor="firstName" className="form-label" >First Name</label>
						<input type="text" className="form-input" name="firstName" value={user.firstName} onChange={this.handleChange} />
						{submitted && !user.firstName &&
							<div className="help-block">First Name is required</div>
						}
					</div>

					<div className='mb-15'>
						<label htmlFor="lastName" className="form-label" >Last Name</label>
						<input type="text" className="form-input" name="lastName" value={user.lastName} onChange={this.handleChange} />
					</div>

					<div className={'mb-15' + (submitted && !user.username || loginStatus === 'exists' ? ' has-error' : '')}>
						<label htmlFor="username" className="form-label" >Email Id</label>
						<input type="text" className="form-input" name="username" value={user.username} onChange={this.handleChange} />
						{submitted && !user.username &&
							<div className="help-block">Email id is required</div>
						}
						{loginStatus === 'exists' &&
							<div className='help-block'>
								Already have a id login now
							</div>
						}
					</div>

					<div className={'mb-15' + (submitted && !user.password ? ' has-error' : '')}>
						<label htmlFor="password" className="form-label">Password</label>
						<input type="password" className="form-input" name="password" value={user.password} onChange={this.handleChange} />
						{submitted && !user.password &&
							<div className="help-block">Password is required</div>
						}
					</div>

					<div className="mb-15">
						<button className="btn btn-primary">Register</button>
						<Link to="/" className="btn btn-link">Cancel</Link>
					</div>

				</form>
			</div>
		);
	}
}

const mapStateToProps = ({ loginUser }) => {
	console.log('mapStateToProps', loginUser)
	return {
		loginStatus: loginUser.loginStatus,
		data: loginUser.data
	}
}

export default connect(
	mapStateToProps,
	{
		addNewUser
	}
)(RegisterPage)