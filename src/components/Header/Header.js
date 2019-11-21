import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import TokenService from '../../services/token-service'
import UserContext from '../../contexts/UserContext'
import './Header.css'

class Header extends Component {
  static contextType = UserContext

  handleLogoutClick = () => {
    this.context.processLogout()
  }

  renderLogoutLink() {
    return (
      <div className="display-user">
        <span>
          Welcome, {this.context.user.name}
        </span>
        <nav>
          <Link
            onClick={this.handleLogoutClick}
            className="nav-link"
            to='/login'>
            Logout
          </Link>
        </nav>
      </div>
    )
  }

  renderLoginLink() {
    return (
      <nav>
        <Link to='/login' className="nav-link">Login</Link>
        {' '}
        <Link to='/register' className="nav-link">Sign up</Link>
      </nav>
    )
  }

  render() {
    return (
      <header >
        <h1>
          <Link className="title" to='/'>
            Spaced repetition
          </Link>
        </h1>
        {TokenService.hasAuthToken()
          ? this.renderLogoutLink()
          : this.renderLoginLink()}
      </header>
    );
  }
}

export default Header
