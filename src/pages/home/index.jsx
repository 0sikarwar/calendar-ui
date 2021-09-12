import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";

class HomePage extends React.Component {
  state = {
    loggedIn: false,
    user: {
      firstName: '',
      lastName: ''
    }
  }
  componentDidMount() {
    let userData = {}
    if (typeof (Storage) !== "undefined") {
      userData = JSON.parse(sessionStorage.getItem("userData"));
    }
    const { loginId } = userData || {}
    if (loginId) {      
      this.setState({
        loggedIn: true,
        user: { ...userData }
      })
    } else {      
      sessionStorage.removeItem("userData")
    }
  }

  logOutUser = () => {
    this.setState({
      loggedIn: false,
      user: {
        firstName: '',
        lastName: ''
      }
    })
  sessionStorage.removeItem("userData")
  }

  render() {
    console.log(this.state);
    const { user, loggedIn } = this.state
    return (
      <div>
        {!loggedIn ? (
          <h2>
            <Link to="/login" className="btn btn-link">Log In</Link>
            <Link to="/register" className="btn btn-link">Register</Link>
            <Link to="/calender" className="btn btn-link">Go to Calender</Link>
          </h2>)
          :
          (<h1>
            welcome {user.firstName} {user.lastName} <span onClick={this.logOutUser} className="btn btn-link">Log out</span>
          </h1>)}
      </div>

    );

  }
}



const mapStateToProps = ({ }) => {
}

export default connect(
  mapStateToProps,
  {

  }
)(HomePage)