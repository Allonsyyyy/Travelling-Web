const createExpiryTime = () => {
    let date = Math.floor(Date.now() / 1000)
    return date + 60 * 60 * 24 * 7
}

const token = {
    createToken: (userId) => {
        const token = userId + "." + createExpiryTime()
        return token
    },
    
    checkTokenExpiry: (token) => {
        let date = Math.floor(Date.now() / 1000)
        let tokenDate = token.split(".")[1]
        if (date > tokenDate) return false
        return true
    }
}

export default token;


