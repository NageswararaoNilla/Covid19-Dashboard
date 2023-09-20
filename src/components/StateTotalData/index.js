import {Component} from 'react'
import './index.css'

class StateTotalData extends Component {
  state = {
    confirmedData: {},
    activeData: {},
    recoveredData: {},
    deceasedData: {},
    activeTab: 'Confirmed',
  }

  componentDidMount() {
    this.getEachState()
  }

  getEachState = async () => {
    const {activeTab} = this.state
    const {eachStateTotalData} = this.props
    // console.log(activeTab)

    const totalConfirmed = eachStateTotalData.confirmed
    const totalRecovered = eachStateTotalData.recovered

    const totalDeceased = eachStateTotalData.deceased

    const totalActive = totalConfirmed - totalRecovered - totalDeceased

    const confirmedData = {
      name: 'Confirmed',
      logo:
        'https://res.cloudinary.com/dducblq2m/image/upload/v1694250424/Covid19%20Dashboard/check-mark_1_tyldxf.svg',
      value: totalConfirmed,
      className: activeTab === 'Confirmed' ? 'confirmed-block' : '',
    }

    const activeData = {
      name: 'Active',
      logo:
        'https://res.cloudinary.com/dducblq2m/image/upload/v1694250424/Covid19%20Dashboard/protection_1_wbesfb.svg',
      value: totalActive,
      className: activeTab === 'Active' ? 'active-block' : '',
    }

    const recoveredData = {
      name: 'Recovered',
      logo:
        'https://res.cloudinary.com/dducblq2m/image/upload/v1694250425/Covid19%20Dashboard/recovered_1_qpdppi.svg',
      value: totalRecovered,
      className: activeTab === 'Recovered' ? 'recovered-block' : '',
    }

    const deceasedData = {
      name: 'Deceased',
      logo:
        'https://res.cloudinary.com/dducblq2m/image/upload/v1694250424/Covid19%20Dashboard/breathing_1_q9lzyd.svg',
      value: totalDeceased,
      className: activeTab === 'Deceased' ? 'deceased-block' : '',
    }

    this.setState({
      confirmedData,
      activeData,
      recoveredData,
      deceasedData,
    })
  }

  onGetTotal = value => {
    const {onGetCategory} = this.props
    onGetCategory(value)
    this.setState({activeTab: value}, this.getEachState)
  }

  render() {
    const {confirmedData, activeData, recoveredData, deceasedData} = this.state
    // console.log(confirmedData.className, activeData.className)

    // const {active} = this.props
    // const activeOnLoad = active ? 'confirmed-block' : ''

    // const activeTabCases = value => {
    //   switch (value) {
    //     case confirmedData.name:
    //       return 'confirmed-block'
    //     case activeData.name:
    //       return 'active-block'
    //     case recoveredData.name:
    //       return 'recovered-block'
    //     case deceasedData.name:
    //       return 'deceased-block'
    //     default:
    //       return ''
    //   }
    // }

    // activeTabCases( confirmedData.name, )

    return (
      <>
        <ul className="ul-list-each-state">
          <li
            className={`card confirmed ${confirmedData.className}`}
            key={confirmedData.name}
            value={confirmedData.name}
            onClick={() => this.onGetTotal(confirmedData.name)}
          >
            <div data-testid="stateSpecificConfirmedCasesContainer">
              <p className="stats-title">{confirmedData.name}</p>
              <img
                src={confirmedData.logo}
                alt="state specific confirmed cases pic"
                className="stats-icon"
              />
              <p className="stats-number">{confirmedData.value}</p>
            </div>
          </li>
          <li
            className={`card active ${activeData.className}`}
            key={activeData.name}
            value={activeData.name}
            onClick={() => this.onGetTotal(activeData.name)}
          >
            <div data-testid="stateSpecificActiveCasesContainer">
              <p className="stats-title">{activeData.name}</p>
              <img
                src={activeData.logo}
                alt="state specific active cases pic"
                className="stats-icon"
              />
              <p className="stats-number">{activeData.value}</p>
            </div>
          </li>
          <li
            className={`card recovered ${recoveredData.className}`}
            key={recoveredData.name}
            value={recoveredData.name}
            onClick={() => this.onGetTotal(recoveredData.name)}
          >
            <div data-testid="stateSpecificRecoveredCasesContainer">
              <p className="stats-title">{recoveredData.name}</p>
              <img
                src={recoveredData.logo}
                alt="state specific recovered cases pic"
                className="stats-icon"
              />
              <p className="stats-number">{recoveredData.value}</p>
            </div>
          </li>
          <li
            className={`card deceased ${deceasedData.className}`}
            key={deceasedData.name}
            value={deceasedData.name}
            onClick={() => this.onGetTotal(deceasedData.name)}
          >
            <div data-testid="stateSpecificDeceasedCasesContainer">
              <p className="stats-title">{deceasedData.name}</p>
              <img
                src={deceasedData.logo}
                alt="state specific deceased cases pic"
                className="stats-icon"
              />
              <p className="stats-number">{deceasedData.value}</p>
            </div>
          </li>
        </ul>
      </>
    )
  }
}

export default StateTotalData
