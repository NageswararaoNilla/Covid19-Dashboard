import {Component} from 'react'

import {Link} from 'react-router-dom'

import './index.css'

class Header extends Component {
  render() {
    return (
      <nav className="nav-bar-container">
        <div className="nav-bar">
          <Link to="/" className="link">
            <h1 className="logo">
              COVID19<span className="india-text">INDIA</span>
            </h1>
          </Link>
          <ul className="nav-bar-menu">
            <Link to="/" className="link">
              <li className="nav-item">Home</li>
            </Link>
            <Link to="/about" className="link">
              <li className="nav-item">About</li>
            </Link>
          </ul>
        </div>
      </nav>
    )
  }
}

export default Header
