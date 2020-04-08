import axios from 'axios'

const API_URL = ''

export const USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser'

class AuthenticationService {

  executeBasicAuthenticationService(username, password) {
    return axios.get(`/basicauth`,
      { headers: { authorization: this.createBasicAuthToken(username, password) } })
  }


  createBasicAuthToken(username, password) {
    return 'Basic ' + window.btoa(username + ":" + password)
  }

  registerSuccessfulLogin(username, password) {
    //let basicAuthHeader = 'Basic ' +  window.btoa(username + ":" + password)
    console.log('registerSuccessfulLogin')
    sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, username)
    this.setupAxiosInterceptors(this.createBasicAuthToken(username, password))
  }


  logout() {
    console.log("Logged out.")
    sessionStorage.removeItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
    if (user === null) return false
    return true
  }

  getLoggedInUserName() {
    let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
    if (user === null) return ''
    return user
  }

  setupAxiosInterceptors(token) {
    axios.interceptors.request.use(
      (config) => {
        if (this.isUserLoggedIn()) {
          config.headers.authorization = token
        }
        return config
      }
    )
  }
}

export default new AuthenticationService()