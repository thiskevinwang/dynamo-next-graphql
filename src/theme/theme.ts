import theme from "styled-theming"

import { Mode } from "./Mode"

export const text = theme("mode", {
  [Mode.AUBERGINE]: "#1D1C1D",
  [Mode.AUBERGINE_DARK]: "#D1D2D3",
  [Mode.MOOD_INDIGO]: "#1D1C1D",
  [Mode.MOOD_INDIGO_DARK]: "#D1D2D3",
})
export const textTime = theme("mode", {
  [Mode.AUBERGINE]: "#616061",
  [Mode.AUBERGINE_DARK]: "#ABABAD",
  [Mode.MOOD_INDIGO]: "#616061",
  [Mode.MOOD_INDIGO_DARK]: "#ABABAD",
})
export const textEdited = theme("mode", {
  [Mode.AUBERGINE]: "#868686",
  [Mode.AUBERGINE_DARK]: "#818385",
  [Mode.MOOD_INDIGO]: "#868686",
  [Mode.MOOD_INDIGO_DARK]: "#818385",
})
export const textSecondaryActive = theme("mode", {
  [Mode.AUBERGINE]: "#FFFFFF",
  [Mode.AUBERGINE_DARK]: "#D1D2D3",
  [Mode.MOOD_INDIGO]: "#001A5E",
  [Mode.MOOD_INDIGO_DARK]: "#D8DCE8",
})
export const textSecondary = theme("mode", {
  [Mode.AUBERGINE]: "#CFC3CF",
  [Mode.AUBERGINE_DARK]: "#A3A3A6",
  [Mode.MOOD_INDIGO]: "#3E5285",
  [Mode.MOOD_INDIGO_DARK]: "#A9ACB6",
})
/** select right under middle top bar */
export const background = theme("mode", {
  [Mode.AUBERGINE]: "#FFFFFF",
  [Mode.AUBERGINE_DARK]: "#1A1D21",
  [Mode.MOOD_INDIGO]: "rgb(255,255,255)",
  [Mode.MOOD_INDIGO_DARK]: "#1A1D21",
})
export const backgroundHover = theme("mode", {
  [Mode.AUBERGINE]: "#FFFFFF",
  [Mode.AUBERGINE_DARK]: "#1A1D21",
  [Mode.MOOD_INDIGO]: "rgb(248,248,248)",
  [Mode.MOOD_INDIGO_DARK]: "rgb(232,232,232,0.04)",
})
/** hover over 'Direct messages' */
export const backgroundSidebar = theme("mode", {
  [Mode.AUBERGINE]: "#3F0E40",
  [Mode.AUBERGINE_DARK]: "#19171D",
  [Mode.MOOD_INDIGO]: "#F8F8FA",
  [Mode.MOOD_INDIGO_DARK]: "#1A1D21",
})
export const backgroundSidebarHover = theme("mode", {
  [Mode.AUBERGINE]: "#3F0E40",
  [Mode.AUBERGINE_DARK]: "#27242C",
  [Mode.MOOD_INDIGO]: "#E0E7FF",
  [Mode.MOOD_INDIGO_DARK]: "#2D3136",
})
export const backgroundSidebarActive = theme("mode", {
  [Mode.AUBERGINE]: "#1164A3",
  [Mode.AUBERGINE_DARK]: "#1164A3",
  [Mode.MOOD_INDIGO]: "#001A5E",
  [Mode.MOOD_INDIGO_DARK]: "#1F2A42",
})
export const topNav = theme("mode", {
  [Mode.AUBERGINE]: "#350D36",
  [Mode.AUBERGINE_DARK]: "#121016",
  [Mode.MOOD_INDIGO]: "#001A5E",
  [Mode.MOOD_INDIGO_DARK]: "#1F2A42",
})
export const muted = theme("mode", {
  [Mode.AUBERGINE]: "rgb(226,226,226)",
  [Mode.AUBERGINE_DARK]: "#2C3036",
  [Mode.MOOD_INDIGO]: "rgb(221,221,221)",
  [Mode.MOOD_INDIGO_DARK]: "#2C3036",
})
