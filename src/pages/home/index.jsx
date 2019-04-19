import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import { loginUser } from '../../sagas/loginUser';


class HomePage extends React.Component {
  state = {
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
    this.setState({
      user: { ...userData }
    })
  }

  render() {
    console.log(this.state);
    const { user } = this.state
    const { loginId } = user || {}
    return (
      <div>
        {!loginId ? (
          <h2>
            <Link to="/login" className="btn btn-link">Log In</Link>
            <Link to="/register" className="btn btn-link">Register</Link>
          </h2>)
          :
          (<h1>
            welcome {user.firstName} {user.lastName}
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