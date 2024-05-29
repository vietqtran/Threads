export const useLocalStorage = () => {
  const setItem = (key: string, value: any) => {
    localStorage.setItem(key, JSON.stringify(value))
  }

  const getItem = (key: string) => {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : null
  }

  const removeItem = (key: string) => {
    localStorage.removeItem(key)
  }

  const clear = () => {
    localStorage.clear()
  }

  return {
    getItem,
    setItem,
    removeItem,
    clear
  }
}
