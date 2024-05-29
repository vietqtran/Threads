export const useSessionStorage = () => {
  const setItem = (key: string, value: any) => {
    sessionStorage.setItem(key, JSON.stringify(value))
  }

  const getItem = (key: string) => {
    const item = sessionStorage.getItem(key)
    return item ? JSON.parse(item) : null
  }

  const removeItem = (key: string) => {
    sessionStorage.removeItem(key)
  }

  const clear = () => {
    sessionStorage.clear()
  }

  return {
    getItem,
    setItem,
    removeItem,
    clear
  }
}
