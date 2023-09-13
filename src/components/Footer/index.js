import {FiInstagram} from 'react-icons/fi'
import {VscGithubAlt} from 'react-icons/vsc'
import {FaTwitter} from 'react-icons/fa'

import './index.css'

export default function Footer() {
  return (
    <div className="footer-container">
      <h1 className="footer-logo">
        COVID19<span className="footer-india">INDIA</span>
      </h1>
      <p className="footer-tagline">
        we stand with everyone fighting on the front lines
      </p>
      <div className="footer-icon-container">
        <VscGithubAlt className="footer-icon" />
        <FiInstagram className="footer-icon" />
        <FaTwitter className="footer-icon bird" />
      </div>
    </div>
  )
}
