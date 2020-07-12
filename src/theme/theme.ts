import theme from "styled-theming"

import { Mode } from "./Mode"

export const text = theme("mode", {
  [Mode.AUBERGINE]: "#1D1C1D",
  [Mode.AUBERGINE_DARK]: "#D1D2D3",
  [Mode.OCHIN]: "#1D1C1D",
  [Mode.OCHIN_DARK]: "#D1D2D3",
  [Mode.MOOD_INDIGO]: "#1D1C1D",
  [Mode.MOOD_INDIGO_DARK]: "#D1D2D3",
})
export const textTime = theme("mode", {
  [Mode.AUBERGINE]: "#616061",
  [Mode.AUBERGINE_DARK]: "#ABABAD",
  [Mode.OCHIN]: "#616061",
  [Mode.OCHIN_DARK]: "#ABABAD",
  [Mode.MOOD_INDIGO]: "#616061",
  [Mode.MOOD_INDIGO_DARK]: "#ABABAD",
})
export const textEdited = theme("mode", {
  [Mode.AUBERGINE]: "#868686",
  [Mode.AUBERGINE_DARK]: "#818385",
  [Mode.OCHIN]: "#868686",
  [Mode.OCHIN_DARK]: "#818385",
  [Mode.MOOD_INDIGO]: "#868686",
  [Mode.MOOD_INDIGO_DARK]: "#818385",
})
export const textSecondary = theme("mode", {
  [Mode.AUBERGINE]: "#CFC3CF",
  [Mode.AUBERGINE_DARK]: "#A3A3A6",
  [Mode.OCHIN]: "#CBCFD3",
  [Mode.OCHIN_DARK]: "#C7C8CA",
  [Mode.MOOD_INDIGO]: "#3E5285",
  [Mode.MOOD_INDIGO_DARK]: "#A9ACB6",
})
export const textSecondaryActive = theme("mode", {
  [Mode.AUBERGINE]: "#FFFFFF",
  [Mode.AUBERGINE_DARK]: "#D1D2D3",
  [Mode.OCHIN]: "#FFFFFF",
  [Mode.OCHIN_DARK]: "#FFFFFF",
  [Mode.MOOD_INDIGO]: "#001A5E",
  [Mode.MOOD_INDIGO_DARK]: "#D8DCE8",
})
export const textSecondaryActiveSelected = theme("mode", {
  [Mode.AUBERGINE]: "#FFFFFF",
  [Mode.AUBERGINE_DARK]: "#FFFFFF",
  [Mode.OCHIN]: "#FFFFFF",
  [Mode.OCHIN_DARK]: "#FFFFFF",
  [Mode.MOOD_INDIGO]: "#F8F8FA",
  [Mode.MOOD_INDIGO_DARK]: "#D8DCE8",
})
/** select right under middle top bar */
export const background = theme("mode", {
  [Mode.AUBERGINE]: "#FFFFFF",
  [Mode.AUBERGINE_DARK]: "#1A1D21",
  [Mode.OCHIN]: "#FFFFFF",
  [Mode.OCHIN_DARK]: "#1A1D21",
  [Mode.MOOD_INDIGO]: "rgb(255,255,255)",
  [Mode.MOOD_INDIGO_DARK]: "#1A1D21",
})
/** these are hard to grab... */
export const backgroundHover = theme("mode", {
  [Mode.AUBERGINE]: "rgb(248,248,248)",
  [Mode.AUBERGINE_DARK]: "#1A1D21",
  [Mode.OCHIN]: "rgb(248,248,248)",
  [Mode.OCHIN_DARK]: "rgb(26,29,33)",
  [Mode.MOOD_INDIGO]: "rgb(248,248,248)",
  [Mode.MOOD_INDIGO_DARK]: "rgba(232,232,232,0.04)",
})
/** hover over 'Direct messages' */
export const backgroundSidebar = theme("mode", {
  [Mode.AUBERGINE]: "#3F0E40",
  [Mode.AUBERGINE_DARK]: "#19171D",
  [Mode.OCHIN]: "#303E4D",
  [Mode.OCHIN_DARK]: "#1D2229",
  [Mode.MOOD_INDIGO]: "#F8F8FA",
  [Mode.MOOD_INDIGO_DARK]: "#1A1D21",
})
export const backgroundSidebarHover = theme("mode", {
  [Mode.AUBERGINE]: "#350D36",
  [Mode.AUBERGINE_DARK]: "#27242C",
  [Mode.OCHIN]: "#4A5664",
  [Mode.OCHIN_DARK]: "#313843",
  [Mode.MOOD_INDIGO]: "#E0E7FF",
  [Mode.MOOD_INDIGO_DARK]: "#2D3136",
})
export const backgroundSidebarActive = theme("mode", {
  [Mode.AUBERGINE]: "#1164A3",
  [Mode.AUBERGINE_DARK]: "#1164A3",
  [Mode.OCHIN]: "#6698C8",
  [Mode.OCHIN_DARK]: "#537AA6",
  [Mode.MOOD_INDIGO]: "#001A5E",
  [Mode.MOOD_INDIGO_DARK]: "#1F2A42",
})
export const topNav = theme("mode", {
  [Mode.AUBERGINE]: "#350D36",
  [Mode.AUBERGINE_DARK]: "#121016",
  [Mode.OCHIN]: "#2C3849",
  [Mode.OCHIN_DARK]: "#0B161E",
  [Mode.MOOD_INDIGO]: "#001A5E",
  [Mode.MOOD_INDIGO_DARK]: "#1F2A42",
})
export const muted = theme("mode", {
  [Mode.AUBERGINE]: "rgb(226,226,226)",
  [Mode.AUBERGINE_DARK]: "#2C3036",
  [Mode.OCHIN]: "rgb(221,221,221)",
  [Mode.OCHIN_DARK]: "#2C3036",
  [Mode.MOOD_INDIGO]: "rgb(221,221,221)",
  [Mode.MOOD_INDIGO_DARK]: "#2C3036",
})
export const borderSidebar = theme("mode", {
  [Mode.AUBERGINE]: "rgb(82,38,83)",
  [Mode.AUBERGINE_DARK]: "rgb(43,42,47)",
  [Mode.OCHIN]: "rgb(69,81,95)",
  [Mode.OCHIN_DARK]: "rgb(52,56,62)",
  [Mode.MOOD_INDIGO]: "rgb(223,226,234)",
  [Mode.MOOD_INDIGO_DARK]: "rgb(45,48,53)",
})
export const statusActive = theme("mode", {
  [Mode.AUBERGINE]: "#2BAC76",
  [Mode.AUBERGINE_DARK]: "#2BAC76",
  [Mode.OCHIN]: "#94E864",
  [Mode.OCHIN_DARK]: "#94E864",
  [Mode.MOOD_INDIGO]: "#2153FF",
  [Mode.MOOD_INDIGO_DARK]: "#2153FF",
})
