import {Component} from 'react'
import './index.css'

class StateTotalData extends Component {
  state = {
    confirmedData: {},
    activeData: {},
    recoveredData: {},
    deceasedData: {},
  }

  componentDidMount() {
    this.getEachState()
  }

  getEachState = async () => {
    const {eachStateTotalData} = this.props

    const totalConfirmed = eachStateTotalData.confirmed
    const totalRecovered = eachStateTotalData.recovered

    const totalDeceased = eachStateTotalData.deceased

    const totalActive = totalConfirmed - totalRecovered - totalDeceased

    const confirmedData = {
      name: 'Confirmed',
      logo:
        'https://res.cloudinary.com/dvmp5vgbm/image/upload/v1654438432/Covid19%20Dashboard/check-mark_1_odg0vn.png',
      value: totalConfirmed,
    }

    const activeData = {
      name: 'Active',
      logo:
        'https://res.cloudinary.com/dvmp5vgbm/image/upload/v1654438417/Covid19%20Dashboard/protection_1_zjqmhw.png',
      value: totalActive,
    }

    const recoveredData = {
      name: 'Recovered',
      logo:
        'https://res.cloudinary.com/dvmp5vgbm/image/upload/v1654438418/Covid19%20Dashboard/recovered_1_qmgv0f.png',
      value: totalRecovered,
    }
    const deceasedData = {
      name: 'Deceased',
      logo:
        'https://res.cloudinary.com/dvmp5vgbm/image/upload/v1654438420/Covid19%20Dashboard/breathing_1_ctu4mw.png',
      value: totalDeceased,
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
  }

  render() {
    const {confirmedData, activeData, recoveredData, deceasedData} = this.state

    const {active} = this.props
    const itsactiveonload = active ? 'confirmed-block' : ''

    return (
      <>
        <ul className="ul-list-eachstate ">
          <li
            className={`category-item ${confirmedData.name} ${itsactiveonload} card`}
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
            className={`category-item ${activeData.name} card`}
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
            className={`category-item ${recoveredData.name} card`}
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
            className={`category-item ${deceasedData.name} card`}
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
