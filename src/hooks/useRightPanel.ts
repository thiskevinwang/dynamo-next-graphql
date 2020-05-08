import { useContext } from "react"

import { RightPanelContext } from "context"

export const useRightPanel = () => {
  return useContext(RightPanelContext)
}
