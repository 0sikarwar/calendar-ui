export const validatePassword = (password, firstName, loginId) => {
    const strongRegex = /^(?=.*[\d])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&])[\w!@#$%^&*]{8,}$/
    const normalRegex = /^(?=.*[\d])(?=.*[a-z])(?=.*[!@#$%^&])[\w!@#$%^&*]{6,}$/
    if (firstName && password.includes(firstName)) {
        return 'weak'
    }
    if (loginId && password.includes(loginId)) {
        return 'weak'
    }
    if (strongRegex.test(password)) {
        return 'strong'
    }
    if (normalRegex.test(password)) {
        return 'normal'
    }
    return 'weak'
}