import {Component} from 'react'
import Loader from 'react-loader-spinner'

import {MdOutlineSearch} from 'react-icons/md'

import Header from '../Header'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getAllData()
  }

  getAllData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const apiUrl = 'https://apis.ccbp.in/covid19-state-wise-data'
    const options = {method: 'GET'}
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      this.setState({
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderNationalData = () => {
    const {apiStatus} = this.state
    console.log(apiStatus)
    return (
      <>
        <div className="stats-block" data-testid="countryWideConfirmedCases">
          <p className="stats-title red">Confirmed</p>
          <img
            className="stats-icon"
            src="https://res.cloudinary.com/dducblq2m/image/upload/v1694250424/Covid19%20Dashboard/check-mark_1_tyldxf.svg"
            alt="country wide confirmed cases pic"
          />
          <p className="stats-count red">342585612</p>
        </div>
        <div className="stats-block" data-testid="countryWideActiveCases">
          <p className="stats-title blue">Active</p>
          <img
            className="stats-icon"
            src="https://res.cloudinary.com/dducblq2m/image/upload/v1694250424/Covid19%20Dashboard/protection_1_wbesfb.svg"
            alt="country wide confirmed cases pic"
          />
          <p className="stats-count blue">342585612</p>
        </div>
        <div className="stats-block" data-testid="countryWideRecoveredCases">
          <p className="stats-title green">Recovered</p>
          <img
            className="stats-icon"
            src="https://res.cloudinary.com/dducblq2m/image/upload/v1694250425/Covid19%20Dashboard/recovered_1_qpdppi.svg"
            alt="country wide confirmed cases pic"
          />
          <p className="stats-count green">342585612</p>
        </div>
        <div className="stats-block" data-testid="countryWideDeceasedCases">
          <p className="stats-title gray">Deceased</p>
          <img
            className="stats-icon"
            src="https://res.cloudinary.com/dducblq2m/image/upload/v1694250424/Covid19%20Dashboard/breathing_1_q9lzyd.svg"
            alt="country wide confirmed cases pic"
          />
          <p className="stats-count gray">342585612</p>
        </div>
      </>
    )
  }

  renderSuccessView = () => {
    const {apiStatus} = this.state
    console.log(apiStatus)
    return (
      <>
        <div className="country-stats">{this.renderNationalData()}</div>
      </>
    )
  }

  renderFailureView = () => (
    <div>
      <p>Fetched data failure</p>
    </div>
  )

  renderLoadingView = () => (
    <div className="loader-dots" data-testid="homeRouteLoader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderAllHomeData = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="app-container">
        <Header />
        <div className="responsive-container">
          <div className="search-container">
            <MdOutlineSearch size={20} color="#94A3B8" />
            <input
              type="search"
              placeholder="Enter the State"
              className="search-input"
            />
          </div>
          {this.renderAllHomeData()}
        </div>
      </div>
    )
  }
}

export default Home
