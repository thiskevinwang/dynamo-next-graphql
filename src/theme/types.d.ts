/**
 * Better TypeScript setup for themes #447
 * @see https://github.com/styled-components/styled-components-website/issues/447
 */

// import original module declarations
import "styled-components"
// import your custom theme
import * as theme from "./"

import { Mode } from "./Mode"
// extend the module declarations using custom theme type
type Theme = typeof theme
type Props = { theme: Theme & { mode: Mode } }
/**
 * * Added `BaseProps`
 * @usage
 *
 * ```tsx
 * import styled, { BaseProps } from 'styled-components'
 * ```
 */
declare module "styled-components" {
  export interface BaseProps extends Props {}
}
