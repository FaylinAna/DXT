import decode from 'jwt-decode'
import axios from 'axios'

const REST_ENDPOINT = 'https://localhost:44366/'
const AUTH_TOKEN_KEY = 'authToken'
const User = 'user'
const Role = 'role'





export function checkrole(){
    return localStorage.getItem(Role)

}

export function loginUser(Username, Password) {
    return new Promise(async (resolve, reject) => {
        try {
            let res = await axios({
                url: `${REST_ENDPOINT}api/Users/authenticate`,
                method: 'POST',
                data: {
                    Username: Username,
                    Password: Password,
                    grant_type: 'Password'
                }
                
            })

            setAuthToken(res.data.token,Username,res.data.role)
            resolve()
        }
        catch (err) {
            console.error('Caught an error during login:', err)
            reject(err)
        }
    })
}

export function logoutUser() {
    clearAuthToken()
}

export function setAuthToken(token,user,role) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    localStorage.setItem(AUTH_TOKEN_KEY, token)
    localStorage.setItem(User, user)
    localStorage.setItem(Role, role)
}

export function getAuthToken() {
    return localStorage.getItem(AUTH_TOKEN_KEY)    
}

export function clearAuthToken() {
    axios.defaults.headers.common['Authorization'] = ''
    localStorage.removeItem(AUTH_TOKEN_KEY)
}

export function isLoggedIn() {
    let authToken = getAuthToken()
    return false//!!authToken && !isTokenExpired(authToken)
}

export function getUserInfo() {
    if (isLoggedIn()) {
        return decode(getAuthToken())
    }
}

function getTokenExpirationDate(encodedToken) {
    let token = decode(encodedToken)
    if (!token.exp) {
        return null
    }
  
    let date = new Date(0)
    date.setUTCSeconds(token.exp)
  
    return date
}
  
function isTokenExpired(token) {
    let expirationDate = getTokenExpirationDate(token)
    return expirationDate < new Date()
}