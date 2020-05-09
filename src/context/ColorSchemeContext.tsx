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
  mode: Mode.AUBERGINE,
  setColorContext: () => null,
})

const reducer = (_state: State, action: Action) => {
  switch (action.type) {
    default:
      return { mode: action.type }
  }
}

export const ColorSchemeProvider: FC = ({ children }) => {
  const prefersDark = useMediaQuery("(prefers-color-scheme: dark)")

  const [{ mode }, dispatch] = useReducer(reducer, {
    mode: prefersDark ? Mode.AUBERGINE_DARK : Mode.AUBERGINE,
  })
  const setColorContext = (mode: Mode) => dispatch({ type: mode })

  // useEffect(() => {
  //   dispatch({ type: prefersDark ? Mode.AUBERGINE_DARK : Mode.AUBERGINE })
  // }, [prefersDark])

  const modes = Object.values(Mode)
  const length = modes.length
  // console.log("modes", modes)
  useEffect(() => {
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.ctrlKey) {
        // console.log(mode)
        const currIndex = modes.indexOf(mode)
        const nextIndex = currIndex + 1 === length ? 0 : currIndex + 1
        // console.log("curr", currIndex, "next", nextIndex)

        switch (e.keyCode) {
          case 68 /** "d" */:
            return dispatch({
              type: modes[nextIndex],
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
  }, [dispatch, mode, modes, length])

  return (
    <ColorSchemeContext.Provider value={{ mode, setColorContext }}>
      <ThemeProvider theme={{ mode, ...theme }}>{children}</ThemeProvider>
    </ColorSchemeContext.Provider>
  )
}
