import {Component} from 'react'
import Loader from 'react-loader-spinner'

import {BsSearch} from 'react-icons/bs'
import {FcGenericSortingAsc, FcGenericSortingDesc} from 'react-icons/fc'

import Header from '../Header'
import Footer from '../Footer'
import SearchItem from '../SearchItem'

import './index.css'

const statesList = [
  {
    state_code: 'AN',
    state_name: 'Andaman and Nicobar Islands',
  },
  {
    state_code: 'AP',
    state_name: 'Andhra Pradesh',
  },
  {
    state_code: 'AR',
    state_name: 'Arunachal Pradesh',
  },
  {
    state_code: 'AS',
    state_name: 'Assam',
  },
  {
    state_code: 'BR',
    state_name: 'Bihar',
  },
  {
    state_code: 'CH',
    state_name: 'Chandigarh',
  },
  {
    state_code: 'CT',
    state_name: 'Chhattisgarh',
  },
  {
    state_code: 'DN',
    state_name: 'Dadra and Nagar Haveli and Daman and Diu',
  },
  {
    state_code: 'DL',
    state_name: 'Delhi',
  },
  {
    state_code: 'GA',
    state_name: 'Goa',
  },
  {
    state_code: 'GJ',
    state_name: 'Gujarat',
  },
  {
    state_code: 'HR',
    state_name: 'Haryana',
  },
  {
    state_code: 'HP',
    state_name: 'Himachal Pradesh',
  },
  {
    state_code: 'JK',
    state_name: 'Jammu and Kashmir',
  },
  {
    state_code: 'JH',
    state_name: 'Jharkhand',
  },
  {
    state_code: 'KA',
    state_name: 'Karnataka',
  },
  {
    state_code: 'KL',
    state_name: 'Kerala',
  },
  {
    state_code: 'LA',
    state_name: 'Ladakh',
  },
  {
    state_code: 'LD',
    state_name: 'Lakshadweep',
  },
  {
    state_code: 'MH',
    state_name: 'Maharashtra',
  },
  {
    state_code: 'MP',
    state_name: 'Madhya Pradesh',
  },
  {
    state_code: 'MN',
    state_name: 'Manipur',
  },
  {
    state_code: 'ML',
    state_name: 'Meghalaya',
  },
  {
    state_code: 'MZ',
    state_name: 'Mizoram',
  },
  {
    state_code: 'NL',
    state_name: 'Nagaland',
  },
  {
    state_code: 'OR',
    state_name: 'Odisha',
  },
  {
    state_code: 'PY',
    state_name: 'Puducherry',
  },
  {
    state_code: 'PB',
    state_name: 'Punjab',
  },
  {
    state_code: 'RJ',
    state_name: 'Rajasthan',
  },
  {
    state_code: 'SK',
    state_name: 'Sikkim',
  },
  {
    state_code: 'TN',
    state_name: 'Tamil Nadu',
  },
  {
    state_code: 'TG',
    state_name: 'Telangana',
  },
  {
    state_code: 'TR',
    state_name: 'Tripura',
  },
  //   {
  //     state_code: 'TT',
  //     state_name: 'Others',
  //   },
  {
    state_code: 'UP',
    state_name: 'Uttar Pradesh',
  },
  {
    state_code: 'UT',
    state_name: 'Uttarakhand',
  },
  {
    state_code: 'WB',
    state_name: 'West Bengal',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    stateWiseData: [],
    searchInput: '',
  }

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
      // console.log(data)
      this.convertObjectsDataIntoListItemsUsingForInMethod(data)
      this.setState({
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  convertObjectsDataIntoListItemsUsingForInMethod = data => {
    // console.log(data)
    const resultList = []
    // getting keys of an object object
    const keyNames = Object.keys(data)

    keyNames.forEach(keyName => {
      const name = statesList.find(state =>
        state.state_code === keyName ? state.state_name : '',
      )
      // console.log(name)
      if (data[keyName] && name !== undefined) {
        const {total} = data[keyName]
        // if the state's covid data is available we will store it or we will store 0
        const confirmed = total.confirmed ? total.confirmed : 0
        const deceased = total.deceased ? total.deceased : 0
        const recovered = total.recovered ? total.recovered : 0
        const tested = total.tested ? total.tested : 0
        const population = data[keyName].meta.population
          ? data[keyName].meta.population
          : 0
        resultList.push({
          stateCode: keyName,
          name: statesList.find(state => state.state_code === keyName)
            .state_name,
          confirmed,
          deceased,
          recovered,
          tested,
          population,
          active: confirmed - (deceased + recovered),
        })
      }
    })
    // console.log(resultList)
    // return resultList
    this.setState({
      stateWiseData: resultList,
    })
  }

  renderNationalData = () => {
    const {stateWiseData} = this.state
    const totalCounts = {
      confirmed: 0,
      deceased: 0,
      recovered: 0,
      tested: 0,
      population: 0,
      active: 0,
    }
    stateWiseData.forEach(each => {
      Object.keys(each).forEach(item => {
        // Check if the item is not 'stateCode' , and then add the count
        if (item !== 'stateCode') {
          //  console.log(each[item])
          totalCounts[item] += each[item] ? each[item] : 0
        }
      })
    })
    // console.log(totalCounts)
    return (
      <>
        <div className="stats-block" data-testid="countryWideConfirmedCases">
          <p className="stats-title red">Confirmed</p>
          <img
            className="stats-icon"
            src="https://res.cloudinary.com/dducblq2m/image/upload/v1694250424/Covid19%20Dashboard/check-mark_1_tyldxf.svg"
            alt="country wide confirmed cases pic"
          />
          <p className="stats-count red">{totalCounts.confirmed}</p>
        </div>
        <div className="stats-block" data-testid="countryWideActiveCases">
          <p className="stats-title blue">Active</p>
          <img
            className="stats-icon"
            src="https://res.cloudinary.com/dducblq2m/image/upload/v1694250424/Covid19%20Dashboard/protection_1_wbesfb.svg"
            alt="country wide active cases pic"
          />
          <p className="stats-count blue">{totalCounts.active}</p>
        </div>
        <div className="stats-block" data-testid="countryWideRecoveredCases">
          <p className="stats-title green">Recovered</p>
          <img
            className="stats-icon"
            src="https://res.cloudinary.com/dducblq2m/image/upload/v1694250425/Covid19%20Dashboard/recovered_1_qpdppi.svg"
            alt="country wide recovered cases pic"
          />
          <p className="stats-count green">{totalCounts.recovered}</p>
        </div>
        <div className="stats-block" data-testid="countryWideDeceasedCases">
          <p className="stats-title gray">Deceased</p>
          <img
            className="stats-icon"
            src="https://res.cloudinary.com/dducblq2m/image/upload/v1694250424/Covid19%20Dashboard/breathing_1_q9lzyd.svg"
            alt="country wide deceased cases pic"
          />
          <p className="stats-count gray">{totalCounts.deceased}</p>
        </div>
      </>
    )
  }

  onClickAscendingSort = () => {
    const {stateWiseData} = this.state
    // console.log(stateWiseData)
    const sortedList = stateWiseData.sort((a, b) => {
      const x = a.name.toUpperCase()
      const y = b.name.toUpperCase()
      return x > y ? 1 : -1
    })
    this.setState({stateWiseData: sortedList})
  }

  onClickDescendingSort = () => {
    const {stateWiseData} = this.state
    const sortedList = stateWiseData.sort((a, b) => {
      const x = a.name.toUpperCase()
      const y = b.name.toUpperCase()
      return x < y ? 1 : -1
    })
    this.setState({stateWiseData: sortedList})
  }

  renderStatesTableData = () => {
    const {stateWiseData} = this.state
    //  const stateNames = statesList.map(each => ({
    //  stateCode: each.state_code,
    //  stateName: each.state_name,
    // }))
    //  console.log(stateNames)
    return (
      <>
        <div className="table-header">
          <div className="sorting-container">
            <p className="table-title">States/UT</p>
            <button
              className="sorting-btn"
              type="button"
              data-testid="ascendingSort"
              onClick={this.onClickAscendingSort}
            >
              <FcGenericSortingAsc className="sorting-icon" />
            </button>

            <button
              className="sorting-btn"
              type="button"
              data-testid="descendingSort"
              onClick={this.onClickDescendingSort}
            >
              <FcGenericSortingDesc className="sorting-icon" />
            </button>
          </div>
          <div className="table-headings">
            <p className="table-title">Confirmed</p>
            <p className="table-title">Active</p>
            <p className="table-title">Recovered</p>
            <p className="table-title">Deceased</p>
            <p className="table-title">Population</p>
          </div>
        </div>
        <hr className="line" />
        <ul className="states-list">
          {stateWiseData.map(eachState => {
            // console.log(eachState)
            //  const name = stateNames.find(
            //  state => state.stateCode === eachState.stateCode)
            //  console.log(name.stateName)
            const stateName = eachState.name
            return (
              <li className="list-item" key={eachState.stateCode}>
                <p className="state-name">{stateName}</p>
                <div className="numbers-container">
                  <p className="number red">{eachState.confirmed}</p>
                  <p className="number blue">{eachState.active}</p>
                  <p className="number green">{eachState.recovered}</p>
                  <p className="number gray">{eachState.deceased}</p>
                  <p className="number gray">{eachState.population}</p>
                </div>
              </li>
            )
          })}
        </ul>
      </>
    )
  }

  renderSuccessView = () => (
    <>
      <div className="country-stats">{this.renderNationalData()}</div>
      <div className="table-container" data-testid="stateWiseCovidDataTable">
        <div className="states-table">{this.renderStatesTableData()}</div>
      </div>
    </>
  )

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

  showSearchList = () => {
    const {searchInput} = this.state
    const searchList = statesList.filter(data =>
      data.state_name.toLowerCase().includes(searchInput.toLowerCase()),
    )
    return (
      <ul
        className="search-result-container"
        data-testid="searchResultsUnorderedList"
      >
        {searchList.map(each => (
          <SearchItem
            key={each.state_code}
            stateName={each.state_name}
            stateCode={each.state_code}
          />
        ))}
      </ul>
    )
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  render() {
    const {searchInput} = this.state
    //  console.log(searchInput)
    return (
      <div className="app-container">
        <Header />
        <div className="responsive-container">
          <div className="search-container">
            <BsSearch size={20} color="#94A3B8" />
            <input
              type="search"
              placeholder="Enter the State"
              className="search-input"
              onChange={this.onChangeSearchInput}
            />
          </div>
          {searchInput.length > 0 && this.showSearchList()}
          {this.renderAllHomeData()}
          <Footer />
        </div>
      </div>
    )
  }
}

export default Home
