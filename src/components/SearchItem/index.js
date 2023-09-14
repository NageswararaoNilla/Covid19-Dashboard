import {Link} from 'react-router-dom'
import {BiChevronRightSquare} from 'react-icons/bi'
import './index.css'

const SearchItem = props => {
  const {stateName, stateCode} = props

  return (
    <li>
      <Link to={`/state/${stateCode}`} className="link">
        <div className="search-result">
          <h1 className="search-result-heading">{stateName}</h1>
          <button type="button" className="search-button">
            {stateCode}
            <BiChevronRightSquare
              testid="searchResultChevronRightIcon"
              alt="line icon"
              className="icon-right"
            />
          </button>
        </div>
      </Link>
    </li>
  )
}

export default SearchItem
