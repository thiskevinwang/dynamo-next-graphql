import { useContext } from "react"

import { TeamsContext } from "context"

export const useTeams = () => {
  return useContext(TeamsContext)
}
