import React from 'react';
import { Link } from 'react-router-dom';

export default class RegisterPage extends React.Component {
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
	}

	render() {
		const { user, submitted } = this.state;
		return (
			<div className="pr-15 pl-15">
				<h2>Register</h2>
				<form name="form" onSubmit={this.handleSubmit}>

					<div className={'mb-15' + (submitted && !user.firstName ? ' has-error' : '')}>
						<label htmlFor="firstName" className="form-label" >First Name</label>
						<input type="text" className="form-input" name="firstName" value={user.firstName} onChange={this.handleChange} />
						{submitted && !user.firstName &&
							<div className="help-block">First Name is required</div>
						}
					</div>

					<div className={'mb-15' + (submitted && !user.lastName ? ' has-error' : '')}>
						<label htmlFor="lastName" className="form-label" >Last Name</label>
						<input type="text" className="form-input" name="lastName" value={user.lastName} onChange={this.handleChange} />
						{submitted && !user.lastName &&
							<div className="help-block">Last Name is required</div>
						}
					</div>

					<div className={'mb-15' + (submitted && !user.username ? ' has-error' : '')}>
						<label htmlFor="username" className="form-label" >Username</label>
						<input type="text" className="form-input" name="username" value={user.username} onChange={this.handleChange} />
						{submitted && !user.username &&
							<div className="help-block">Username is required</div>
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
						<Link to="/login" className="btn btn-link">Cancel</Link>
					</div>

				</form>
			</div>
		);
	}
}
