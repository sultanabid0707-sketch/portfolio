import { createContext, useContext, useEffect, useState } from 'react'

const ThemeContext = createContext()

export function ThemeProvider({ children }) {
  const [dark, setDark] = useState(true)

  useEffect(() => {
    const root = document.documentElement
    if (dark) {
      root.classList.remove('light')
    } else {
      root.classList.add('light')
    }
  }, [dark])

  return (
    <ThemeContext.Provider value={{ dark, toggle: () => setDark((d) => !d) }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
