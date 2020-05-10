import { useEffect, useReducer, createContext } from "react"
import { GraphQLClient } from "graphql-request"

const ENDPOINT = process.env.ENDPOINT as string

const QUERY_TEAMS_QUERY = `
query QueryTeams {
  queryTeams {
    PK
    SK
    createdAt
    updatedAt
    teamName
  }
}
`
type Response = {
  queryTeams: {
    PK: string
    SK: string
    createdAt: string
    updatedAt: string
    teamName: string
  }[]
}

interface TeamsState {
  teamName?: string
  availableTeams?: string[]
}
enum TeamsEnum {
  SET_TEAM = "SET_TEAM",
  UPDATE_TEAMS = "UPDATE_TEAMS",
}

type SetTeamAction = {
  type: TeamsEnum.SET_TEAM
  teamName: string
}
type UpdateTeamsAction = {
  type: TeamsEnum.UPDATE_TEAMS
  availableTeams: string[]
}

type TeamsAction = SetTeamAction | UpdateTeamsAction

interface TeamsContextShape extends TeamsState {
  handleSetTeam(teamName: string): void
  handleUpdateTeams(availableTeams: string[]): void
}

export const TeamsContext = createContext<TeamsContextShape>({
  teamName: undefined,
  availableTeams: undefined,
  handleSetTeam: () => ({}),
  handleUpdateTeams: () => ({}),
})

const teamsReducer = (state: TeamsState, action: TeamsAction) => {
  switch (action.type) {
    case TeamsEnum.SET_TEAM:
      return { ...state, teamName: action.teamName }
    case TeamsEnum.UPDATE_TEAMS:
      return { ...state, availableTeams: action.availableTeams }
    default:
      return state
  }
}

export const TeamsProvider: React.FC = ({ children }) => {
  const client = new GraphQLClient(ENDPOINT)

  const [{ teamName, availableTeams }, dispatch] = useReducer(teamsReducer, {
    teamName: "testspace",
    availableTeams: [],
  })

  const handleSetTeam: TeamsContextShape["handleSetTeam"] = (teamName) => {
    return dispatch({ type: TeamsEnum.SET_TEAM, teamName })
  }
  const handleUpdateTeams: TeamsContextShape["handleUpdateTeams"] = (
    availableTeams
  ) => {
    return dispatch({ type: TeamsEnum.UPDATE_TEAMS, availableTeams })
  }

  useEffect(() => {
    client.request<Response>(QUERY_TEAMS_QUERY).then(({ queryTeams }) => {
      const teamNames: string[] = queryTeams.reduce((list, next) => {
        return [...list, next.teamName]
      }, [] as any[])
      handleUpdateTeams(teamNames)
    })
  }, [])

  return (
    <TeamsContext.Provider
      value={{
        teamName,
        availableTeams,
        handleSetTeam,
        handleUpdateTeams,
      }}
    >
      {children}
    </TeamsContext.Provider>
  )
}
