import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

class LoginForm extends Component {
  state = {
    userId: '',
    pin: '',
    showError: false,
    errorMsg: '',
  }

  changePin = e => {
    this.setState({pin: e.target.value})
  }

  changeUserId = e => {
    this.setState({userId: e.target.value})
  }

  successSubmit = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  failureSubmit = errorMsg => {
    this.setState({showError: true, errorMsg})
  }

  submitForm = async e => {
    e.preventDefault()
    const {userId, pin} = this.state
    const userCredentials = {user_id: userId, pin}
    const url = 'https://apis.ccbp.in/ebank/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userCredentials),
    }

    const response = await fetch(url, options)
    console.log(response)
    const data = await response.json()
    console.log(data.jwt_token)
    if (response.ok) {
      this.successSubmit(data.jwt_token)
    } else {
      this.failureSubmit(data.error_msg)
    }
  }

  render() {
    const {userId, pin, showError, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div>
        <div className="left-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
            alt="website login"
          />
        </div>

        <h1>Welcome Back</h1>
        <form onSubmit={this.submitForm}>
          <label htmlFor="userId">User ID</label>
          <input
            type="text"
            onChange={this.changeUserId}
            placeholder="Enter User ID"
            value={userId}
            id="userId"
          />
          <label htmlFor="pin">PIN</label>
          <input
            type="password"
            onChange={this.changePin}
            placeholder="Enter PIN"
            value={pin}
            id="pin"
          />
          <button type="submit">Login</button>
          {showError && <p>{errorMsg}</p>}
        </form>
      </div>
    )
  }
}

export default LoginForm
