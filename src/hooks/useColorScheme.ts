import { useContext } from "react"

import { ColorSchemeContext } from "context"

export const useColorScheme = () => {
  return useContext(ColorSchemeContext)
}
