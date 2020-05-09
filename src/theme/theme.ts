import theme from "styled-theming"

import { Mode } from "./Mode"

export const text = theme("mode", {
  [Mode.AUBERGINE]: "#1D1C1D",
  [Mode.AUBERGINE_DARK]: "#D1D2D3",
  [Mode.MOOD_INDIGO]: "#1D1C1D",
  [Mode.MOOD_INDIGO_DARK]: "#D1D2D3",
  [Mode.OCHIN]: "#1D1C1D",
})
export const textTime = theme("mode", {
  [Mode.AUBERGINE]: "#616061",
  [Mode.AUBERGINE_DARK]: "#ABABAD",
  [Mode.MOOD_INDIGO]: "#616061",
  [Mode.MOOD_INDIGO_DARK]: "#ABABAD",
  [Mode.OCHIN]: "#616061",
})
export const textEdited = theme("mode", {
  [Mode.AUBERGINE]: "#868686",
  [Mode.AUBERGINE_DARK]: "#818385",
  [Mode.MOOD_INDIGO]: "#868686",
  [Mode.MOOD_INDIGO_DARK]: "#818385",
  [Mode.OCHIN]: "#868686",
})
export const textSecondaryActive = theme("mode", {
  [Mode.AUBERGINE]: "#FFFFFF",
  [Mode.AUBERGINE_DARK]: "#D1D2D3",
  [Mode.MOOD_INDIGO]: "#001A5E",
  [Mode.MOOD_INDIGO_DARK]: "#D8DCE8",
  [Mode.OCHIN]: "#FFFFFF",
})
export const textSecondary = theme("mode", {
  [Mode.AUBERGINE]: "#CFC3CF",
  [Mode.AUBERGINE_DARK]: "#A3A3A6",
  [Mode.MOOD_INDIGO]: "#3E5285",
  [Mode.MOOD_INDIGO_DARK]: "#A9ACB6",
  [Mode.OCHIN]: "#CBCFD3",
})
/** select right under middle top bar */
export const background = theme("mode", {
  [Mode.AUBERGINE]: "#FFFFFF",
  [Mode.AUBERGINE_DARK]: "#1A1D21",
  [Mode.MOOD_INDIGO]: "rgb(255,255,255)",
  [Mode.MOOD_INDIGO_DARK]: "#1A1D21",
  [Mode.OCHIN]: "#FFFFFF",
})
export const backgroundHover = theme("mode", {
  [Mode.AUBERGINE]: "rgb(248,248,248)",
  [Mode.AUBERGINE_DARK]: "#1A1D21",
  [Mode.MOOD_INDIGO]: "rgb(248,248,248)",
  [Mode.MOOD_INDIGO_DARK]: "rgb(232,232,232,0.04)",
  [Mode.OCHIN]: "rgb(248,248,248)",
})
/** hover over 'Direct messages' */
export const backgroundSidebar = theme("mode", {
  [Mode.AUBERGINE]: "#3F0E40",
  [Mode.AUBERGINE_DARK]: "#19171D",
  [Mode.MOOD_INDIGO]: "#F8F8FA",
  [Mode.MOOD_INDIGO_DARK]: "#1A1D21",
  [Mode.OCHIN]: "#303E4D",
})
export const backgroundSidebarHover = theme("mode", {
  [Mode.AUBERGINE]: "#350D36",
  [Mode.AUBERGINE_DARK]: "#27242C",
  [Mode.MOOD_INDIGO]: "#E0E7FF",
  [Mode.MOOD_INDIGO_DARK]: "#2D3136",
  [Mode.OCHIN]: "#4A5664",
})
export const backgroundSidebarActive = theme("mode", {
  [Mode.AUBERGINE]: "#1164A3",
  [Mode.AUBERGINE_DARK]: "#1164A3",
  [Mode.MOOD_INDIGO]: "#001A5E",
  [Mode.MOOD_INDIGO_DARK]: "#1F2A42",
  [Mode.OCHIN]: "#6698C8",
})
export const topNav = theme("mode", {
  [Mode.AUBERGINE]: "#350D36",
  [Mode.AUBERGINE_DARK]: "#121016",
  [Mode.MOOD_INDIGO]: "#001A5E",
  [Mode.MOOD_INDIGO_DARK]: "#1F2A42",
  [Mode.OCHIN]: "#2C3849",
})
export const muted = theme("mode", {
  [Mode.AUBERGINE]: "rgb(226,226,226)",
  [Mode.AUBERGINE_DARK]: "#2C3036",
  [Mode.MOOD_INDIGO]: "rgb(221,221,221)",
  [Mode.MOOD_INDIGO_DARK]: "#2C3036",
  [Mode.OCHIN]: "rgb(221,221,221)",
})
export const borderSidebar = theme("mode", {
  [Mode.OCHIN]: "rgb(69,81,95)",
})
