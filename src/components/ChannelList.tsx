import styled from "styled-components"
import useSwr from "swr"
import { request } from "graphql-request"

import { LinkActive } from "components/LinkActive"
import { useTeams, useAuth } from "hooks"

const ENDPOINT = process.env.ENDPOINT as string
const QUERY_TEAM_CHANNELS_QUERY = `
query QueryTeamChannels($teamName: String!) {
  queryTeamChannels(teamName: $teamName) {
    PK
    SK
    channelName
  }
}
`
interface QueryChannelsResponse {
  queryTeamChannels: {
    PK: string
    SK: string
    channelName: string
  }[]
}

export const ChannelList = () => {
  const { teamName } = useTeams()
  const { username } = useAuth()
  const { data } = useSwr<QueryChannelsResponse>(
    [QUERY_TEAM_CHANNELS_QUERY, teamName],
    (query) => request(ENDPOINT, query, { teamName })
  )

  return (
    <Container>
      <details open>
        <summary>Channels</summary>
        <ul>
          {data?.queryTeamChannels?.map((channel) => {
            const { PK, SK, channelName } = channel
            return (
              <LinkActive
                key={`${PK}${SK}`}
                href={"/[teamName]/[channelName]/user_profile/[userId]"}
                as={`/${teamName}/${channelName}/user_profile/${username}`}
              >
                # {channelName}
              </LinkActive>
            )
          })}
        </ul>
      </details>
    </Container>
  )
}

const Container = styled.div`
  white-space: nowrap;

  padding-top: 10px;
  padding-bottom: 10px;
  summary {
    padding-left: 1rem;
  }
  ul {
    display: flex;
    flex-direction: column;

    padding: 0;
    margin: 0;
    list-style: none;
    li {
      padding-left: 1rem;
      height: 28px;
      display: flex;
      align-items: center;
    }
  }
`
