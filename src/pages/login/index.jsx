import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";

import { loginUser } from 'Actions/login'

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      submitted: false
    };
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({ submitted: true });
    const { username, password } = this.state;
    if (username && password) {
      this.props.loginUser({ email: username, password: password })
    }
  }

  render() {
    const { username, password, submitted } = this.state;
    return (
      <div className="pr-15 pl-15">
        <h2>Login</h2>
        <form name="form" onSubmit={this.handleSubmit}>

          <div className={'mb-15' + (submitted && !username ? ' has-error' : '')}>
            <label htmlFor="username" className="form-label">Username</label>
            <input type="text" className="form-input" name="username" value={username} onChange={this.handleChange} />
            {submitted && !username &&
              <div className="help-block">Username is required</div>
            }
          </div>

          <div className={'mb-15' + (submitted && !password ? ' has-error' : '')}>
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-input" name="password" value={password} onChange={this.handleChange} />
            {submitted && !password &&
              <div className="help-block">Password is required</div>
            }
          </div>

          <div className="mb-15">
            <button className="btn btn-primary">Login</button>
            <Link to="/register" className="btn btn-link">Register</Link>
          </div>

        </form>
      </div>
    );
  }
}
export default connect(
  null,
  {
    loginUser
  }
)(LoginPage)