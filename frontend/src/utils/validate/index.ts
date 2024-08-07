export const isAllNumber = (value: string) => {
    return /^\d+$/.test(value)
}

export const isValidPhone = (value: string) => {
    return /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(value)
}

export const isValidEmail = (value: string) => {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)
}
