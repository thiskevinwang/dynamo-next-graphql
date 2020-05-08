import { FC, useReducer, useEffect, createContext } from "react"
import { useMediaQuery } from "@material-ui/core"
import { ThemeProvider } from "styled-components"
import { theme, Mode } from "theme"

type State = {
  mode: Mode
}

type Action = {
  type: Mode
}

interface ColorSchemeContextShape extends State {
  setColorContext(mode: Mode): void
}

export const ColorSchemeContext = createContext<ColorSchemeContextShape>({
  mode: Mode.DEFAULT,
  setColorContext: () => null,
})

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case Mode.DEFAULT:
      return { mode: Mode.DEFAULT }
    case Mode.DARK:
      return { mode: Mode.DARK }
    default:
      return state
  }
}

export const ColorSchemeProvider: FC = ({ children }) => {
  const prefersDark = useMediaQuery("(prefers-color-scheme: dark)")

  const [{ mode }, dispatch] = useReducer(reducer, {
    mode: prefersDark ? Mode.DARK : Mode.DEFAULT,
  })
  const setColorContext = (mode: Mode) => dispatch({ type: mode })

  // useEffect(() => {
  //   dispatch({ type: prefersDark ? Mode.DARK : Mode.DEFAULT })
  // }, [prefersDark])

  useEffect(() => {
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.ctrlKey) {
        console.log(mode)
        switch (e.keyCode) {
          case 68 /** "d" */:
            return dispatch({
              type: mode === Mode.DEFAULT ? Mode.DARK : Mode.DEFAULT,
            })
          default:
            return
        }
      }
    }

    typeof window !== "undefined" &&
      window.addEventListener("keyup", handleKeyUp)

    return () => {
      window.removeEventListener("keyup", handleKeyUp)
    }
  }, [dispatch, mode])

  return (
    <ColorSchemeContext.Provider value={{ mode, setColorContext }}>
      <ThemeProvider theme={{ mode, ...theme }}>{children}</ThemeProvider>
    </ColorSchemeContext.Provider>
  )
}
