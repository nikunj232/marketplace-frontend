export const accessTokenKey = 'access_token'
// ** set Access Token
export const setAccessToken = (token) => {
    return localStorage.setItem("access_token", token)
}

// ** get Access Token
export const getAccessToken = () => {
    return localStorage.getItem("access_token")
}

// getAccessToken
export const isUserLoggedIn = () => {
    // eslint-disable-next-line no-unneeded-ternary
    return getAccessToken() ? true : false
}

// ** Remove Access Token
export const removeAccessToken = () => {
    return localStorage.removeItem("access_token")
}

// ** Profile Complate Status setItem
export const setProfileComplateStatus = (isProfileComplete) => {
    return localStorage.setItem('isProfileComplete', isProfileComplete)
}

// ** getProfileStatus
export const getProfileStatus = () => {
    return localStorage.getItem("isProfileComplete")
}

// ** isTravelerProfileStatus
export const isTravelerProfileStatus = () => {
    // eslint-disable-next-line no-unneeded-ternary
    return getProfileStatus() ? true : false
}

// ** Remove Profile Complate Status
export const removeProfileComplateStatus = () => {
    return localStorage.removeItem("isProfileComplete")
}

// ** User Logout
export const userLogout = () => {
    removeAccessToken()
    removeProfileComplateStatus()
}