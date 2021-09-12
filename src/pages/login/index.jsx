import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";

import { loginUser, resetLoginUser } from '../../actions/login'

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    let userData = {}
    this.state = {
      username: '',
      password: '',
      submitted: false,
      neededToLoad: true
    };

    if (typeof (Storage) !== "undefined") {
      userData = JSON.parse(sessionStorage.getItem("userData"));
    }
    const { loginId } = userData || {}
    if (loginId) {
      props.history.push('/')
    }
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }
  onLoginFailed = () => {
    console.log('onALoginFailed')
    const { loginStatus, submission } = this.props
    if (submission === 'failed') {
      if (loginStatus === 'auth') {
        this.passwordRef.focus();
      }
      if (loginStatus === 'invalid') {
        this.userNameRef.focus();
      }
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({ submitted: true });
    const { username, password } = this.state;
    if (username && password) {
      const userData = { userDocument: { loginId: username, password: password } }
      this.props.loginUser({ userData, onLoginFailed: this.onLoginFailed })
    }
  }
  resetLogin = () => {
    this.props.resetLoginUser()
  }

  render() {
    const { username, password, submitted } = this.state;
    const { loginStatus } = this.props
    return (
      <div className="pr-15 pl-15 col-1 hCenter pr max-wt-500">
        <div className='flex flex-middle flex-between'>
          <h2>Login</h2>
          <Link to="/register" onClick={this.resetLogin} className="btn btn-link">Register</Link>
        </div>
        <form name="form" onSubmit={this.handleSubmit}>

          <div className={'mb-15' + (submitted && !username || loginStatus === 'invalid' ? ' has-error' : '')}>
            <label htmlFor="username" className="form-label">Email Id</label>
            <input type="email" ref={(ref) => { this.userNameRef = ref }} className="form-input" name="username" value={username} onChange={this.handleChange} />
            {loginStatus === 'invalid' &&
              <div className='help-block'>
                Not a Registered user
            <Link to="/register" onClick={this.resetLogin} className="btn btn-link"> Register now</Link>
              </div>
            }
            {submitted && !username &&
              <div className="help-block">Email Id is required</div>
            }
          </div>

          <div className={'mb-15' + ((submitted && !password) || loginStatus === 'auth' ? ' has-error' : '')}>
            <label htmlFor="password" className="form-label">Password</label>
            <input ref={(ref) => { this.passwordRef = ref }} type="password" className="form-input" name="password" value={password} onChange={this.handleChange} />
            {submitted && !password &&
              <div className="help-block">Password is required</div>
            }
          </div>

          <div className="mb-15">
            <button className="btn btn-primary">Login</button>
            <Link to="/" className="btn btn-link">cancel</Link>
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
    submission: loginUser.submission
  }
}

export default connect(
  mapStateToProps,
  {
    loginUser,
    resetLoginUser
  }
)(LoginPage)