import styled from "styled-components"
import useSwr from "swr"
import { request } from "graphql-request"

import { LinkActive } from "components/LinkActive"

const ENDPOINT = process.env.ENDPOINT as string
const QUERY_CHANNELS_QUERY = `
query QueryChannels {
  queryChannels {
    PK
    SK
    channelName
  }
}
`
interface QueryChannelsResponse {
  queryChannels: {
    PK: string
    SK: string
    channelName: string
  }[]
}

export const ChannelList = () => {
  const { data } = useSwr<QueryChannelsResponse>(
    QUERY_CHANNELS_QUERY,
    (query) => request(ENDPOINT, query)
  )
  return (
    <Container>
      <details open>
        <summary>Channels</summary>
        <ul>
          {data?.queryChannels.map((channel) => {
            const { PK, SK, channelName } = channel
            return (
              <LinkActive
                key={`${PK}${SK}`}
                href={"/channels/[channelName]"}
                as={`/channels/${channelName}`}
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
