import {Component} from 'react'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import FaqItem from '../FaqItem'
import Footer from '../Footer'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
}

class About extends Component {
  state = {
    faqsList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getFaqsData()
  }

  getFaqsData = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const faqsApiUrl = 'https://apis.ccbp.in/covid19-faqs'
    const options = {
      method: 'GET',
    }

    const response = await fetch(faqsApiUrl, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      console.log(fetchedData)
      this.setState({
        faqsList: fetchedData.faq,
        apiStatus: apiStatusConstants.success,
      })
    }
  }

  renderAboutView = () => {
    const {faqsList} = this.state
    return (
      <div className="about-container">
        <h1 className="about-heading">About</h1>
        <p className="last-update">Last update on march 28th 2021.</p>
        <p className="about-description">
          COVID-19 vaccines be ready for distribution
        </p>
        <ul className="faq-list" data-testid="faqsUnorderedList">
          {faqsList.map(eachFaq => (
            <FaqItem faqData={eachFaq} key={eachFaq.qno} />
          ))}
        </ul>
        <Footer />
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="about-loader-container" data-testid="aboutRouteLoader">
      <Loader type="Oval" color="#0b69ff" height="40" width="40" />
    </div>
  )

  renderAllAboutData = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderAboutView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="about-route-container">
        <Header />
        {this.renderAllAboutData()}
      </div>
    )
  }
}

export default About
