export const regexToEmails = (email) => {
    
    const regex = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/;
    const validationRegex = regex.test(email)
    
    return validationRegex
}