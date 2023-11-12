import {withRouter} from 'react-router-dom'

import Cookies from 'js-cookie'

const Header = props => {
  const logoutButton = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/ebank-logo-img.png"
        alt="website logo"
      />
      <button type="button" onClick={logoutButton}>
        Logout
      </button>
    </div>
  )
}

export default withRouter(Header)
