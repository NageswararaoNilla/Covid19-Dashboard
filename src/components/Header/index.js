import {Component} from 'react'

import {Link} from 'react-router-dom'

// import {PiQueue} from 'react-icons/pi'

import {IoIosCloseCircle, IoMdMenu} from 'react-icons/io'

import './index.css'

class Header extends Component {
  state = {mobileMenuActive: false}

  onClickMenuIcon = () => {
    this.setState(prevState => ({
      mobileMenuActive: !prevState.mobileMenuActive,
    }))
  }

  showDropDownMenu = () => (
    <div className="mobile-menu-container">
      <div className="mobile-menu">
        <ul className="mobile-menu-list">
          <Link to="/" className="link">
            <li className="mobile-item">Home</li>
          </Link>
          <Link to="/about" className="link">
            <li className="mobile-item">About</li>
          </Link>
        </ul>
        <button
          type="button"
          className="cross-btn"
          onClick={this.onClickMenuIcon}
        >
          <IoIosCloseCircle size={24} color="#ffffff" />
        </button>
      </div>
    </div>
  )

  render() {
    const {mobileMenuActive} = this.state

    return (
      <>
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
            <button
              type="button"
              className="toggle-btn"
              onClick={this.onClickMenuIcon}
            >
              <IoMdMenu size={28} color="#ffffff" />
            </button>
          </div>
        </nav>
        {mobileMenuActive && this.showDropDownMenu()}
      </>
    )
  }
}

export default Header
