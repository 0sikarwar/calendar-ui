export const validatePassword = (pass, firstName, loginId) => {
    const strongRegex = /^(?=.*[\d])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&])[\w!@#$%^&*]{8,}$/
    const normalRegex = /^(?=.*[\d])(?=.*[a-z])(?=.*[!@#$%^&])[\w!@#$%^&*]{6,}$/
    if (firstName && pass.includes(firstName)) {
        return 'weak'
    }
    if (loginId && pass.includes(loginId)) {
        return 'weak'
    }
    if (strongRegex.test(pass)) {
        return 'strong'
    }
    if (normalRegex.test(pass)) {
        return 'normal'
    }
    return 'weak'
}