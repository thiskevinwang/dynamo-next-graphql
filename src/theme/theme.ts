import theme from "styled-theming"

import { Mode } from "./Mode"

export const text = theme("mode", {
  [Mode.DEFAULT]: "black",
  [Mode.DARK]: "white",
})
export const background = theme("mode", {
  [Mode.DEFAULT]: "#fff",
  [Mode.DARK]: "#000",
})
export const primary = theme("mode", {
  [Mode.DEFAULT]: "",
  [Mode.DARK]: "",
})
export const secondary = theme("mode", {
  [Mode.DEFAULT]: "",
  [Mode.DARK]: "",
})
export const accent = theme("mode", {
  [Mode.DEFAULT]: "",
  [Mode.DARK]: "",
})
export const highlight = theme("mode", {
  [Mode.DEFAULT]: "",
  [Mode.DARK]: "",
})
export const muted = theme("mode", {
  [Mode.DEFAULT]: "lightgrey",
  [Mode.DARK]: "darkgrey",
})
export const backgroundColor = theme("mode", {
  [Mode.DEFAULT]: "#fff",
  [Mode.DARK]: "#000",
})
