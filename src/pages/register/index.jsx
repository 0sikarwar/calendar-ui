import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";

import { addNewUser } from 'Actions/register'
import { validatePassword } from 'Utils'
import ToolTip from 'Components/toolTipModal'

class RegisterPage extends React.Component {
	constructor(props) {
		let userData = {}
		super(props);
		this.state = {
			user: {
				firstName: '',
				lastName: '',
				loginId: '',
				password: ''
			},
			submitted: false,
			strengthPass: '',
			showStrengthBar: false
		};
		if (typeof (Storage) !== "undefined") {
			userData = JSON.parse(sessionStorage.getItem("userData"));
		}
		const { loginId } = userData || {}
		if (loginId) {
			props.history.push('/')
		}
	}

	handleChange = (event) => {
		const { name, value } = event.target;
		const { user } = this.state;
		let { strengthPass } = this.state;
		if (name === 'password') {
			strengthPass = validatePassword(value, user.firstName, user.loginId)
		}
		this.setState({
			user: {
				...user,
				[name]: value,
			},
			strengthPass
		});
		console.log(this.state.strengthPass);
	}

	onRegisterFailed = () => {
		console.log('onRegisterFailed')
		const { loginStatus, submission } = this.props
		if (submission === 'failed') {
			if (loginStatus === 'exists') {
				this.passwordRef.focus();
			}
		}
	}
	passwordFocused = () => {
		console.log("passwordFocused")
		this.setState({
			showStrengthBar: true,
			strengthPass: this.state.strengthPass || 'weak'
		})
	}

	handleSubmit = (event) => {
		event.preventDefault();

		this.setState({ submitted: true });
		const { user } = this.state;
		console.log(user)
		if (user.firstName && user.loginId && user.password) {
			const userData = { userDocument: user }
			this.props.addNewUser({ userData, onRegisterFailed: this.onRegisterFailed });
		}
	}

	render() {
		const { user, submitted, showStrengthBar, strengthPass } = this.state;
		const { loginStatus } = this.props

		return (
			<div className="pr-15 pl-15 col-1 hCenter pr max-wt-500">
				<div className='flex flex-middle flex-between'>
					<h2>Register</h2>
					<Link to="/login" className="btn btn-link"> LogIn</Link>
				</div>

				<form name="form" onSubmit={this.handleSubmit}>

					<div className={'mb-15' + (submitted && !user.firstName ? ' has-error' : '')}>
						<label htmlFor="firstName" className="form-label" >First Name</label>
						<input type="text" className="form-input" name="firstName" value={user.firstName} onChange={this.handleChange} />
						<If condition={submitted && !user.firstName}>
							<div className="help-block">First Name is required</div>
						</If>
					</div>

					<div className='mb-15'>
						<label htmlFor="lastName" className="form-label" >Last Name</label>
						<input type="text" className="form-input" name="lastName" value={user.lastName} onChange={this.handleChange} />
					</div>

					<div className={'mb-15' + (submitted && !user.loginId || loginStatus === 'exists' ? ' has-error' : '')}>
						<label htmlFor="loginId" className="form-label" >Email Id</label>
						<input type="email" className="form-input" name="loginId" value={user.loginId} onChange={this.handleChange} />
						<If condition={submitted && !user.loginId}>
							<div className="help-block">Email id is required</div>
						</If>
						<If condition={loginStatus === 'exists'}>
							<div className='help-block'>
								Already have a id login now
							</div>
						</If>
					</div>

					<div className={'mb-15 pr ' + (submitted && !user.password ? ' has-error' : '')}>
						<label htmlFor="password" className="form-label">Password</label>
						<input ref={(ref) => { this.passwordRef = ref }} type="password" className="form-input" name="password" value={user.password} onChange={this.handleChange} onFocus={this.passwordFocused} />
						<If condition={submitted && !user.password}>
							<div className="help-block">Password is required</div>
						</If>
						<If condition={showStrengthBar && user.password}>

							<div className="strengthBarContainer mt-5">
								<div className={`strengthBar ${strengthPass} br-20`}>

								</div>
							</div>
						</If>
						<If condition={user.password && strengthPass === 'weak'}>
							<ToolTip>
								<div className='fs-12 '>
									Alteast 1 lowercase, 1 specialchar, 1 digit
							</div>
							</ToolTip>
						</If>
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