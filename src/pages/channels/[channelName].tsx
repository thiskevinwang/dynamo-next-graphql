import { useState, FormEvent } from "react"
import { NextPage, GetServerSideProps } from "next"
import useSwr from "swr"
import { GraphQLClient } from "graphql-request"
import styled from "styled-components"

import { SlackLayout } from "components/SlackLayout"
import { useAuth } from "hooks"

const ENDPOINT = "http://localhost:4000"
const client = new GraphQLClient(ENDPOINT)

const ROW_FRAGMENT = `
fragment Row on Row {
  PK
  SK
  createdAt
  updatedAt
}
`

const QUERY_MESSAGES_BY_CHANNEL_QUERY = `
${ROW_FRAGMENT}
query QueryChannelAndMessages($channelName: String!) {
  queryMessagesByChannel(channelName: $channelName) {
    ...Row
    body
    username
  }
}
`

const CREATE_MESSAGE_MUTATION = `
${ROW_FRAGMENT}
mutation CreateMessage(
  $channelName: String!
  $username: String!
  $body: String!
) {
  createMessage(channelName: $channelName, username: $username, body: $body) {
    ...Row
    body
  }
}
`

interface Message {
  PK: string
  SK: string
  createdAt?: string
  updatedAt?: string
  body: string
  username: string
}

const InputContainer = styled.div`
  position: absolute;
  bottom: 1rem;
  display: flex;
  justify-content: center;
  width: 100%;
  > form {
    display: flex;
    justify-content: center;
    width: 100%;
  }
  input {
    width: 90%;
  }
`

const Message = styled.div`
  padding: 5px;
`

export default (({ channelName, queryMessagesByChannel: messages }) => {
  const { username, token } = useAuth()
  const [body, setBody] = useState("")

  client.setHeader("Authorization", `Bearer ${token}`)
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    client
      .request(CREATE_MESSAGE_MUTATION, {
        channelName,
        username,
        body,
      })
      .then(() => {
        setBody("")
        revalidate()
      })
  }

  const { data, revalidate } = useSwr<QueryChannelAndMessagesResponse>(
    QUERY_MESSAGES_BY_CHANNEL_QUERY + channelName,
    () => {
      return client.request(QUERY_MESSAGES_BY_CHANNEL_QUERY, { channelName })
    }
  )

  return (
    <SlackLayout title={channelName ?? "-"}>
      {(data?.queryMessagesByChannel ?? messages).map((message) => {
        const { PK, SK, body } = message
        return (
          <Message key={`${PK}${SK}`}>
            <div>
              <b>{message.username}</b>
              <small>{message.createdAt}</small>
            </div>
            <div>{body}</div>
          </Message>
        )
      })}
      {username && (
        <InputContainer>
          <form onSubmit={handleSubmit}>
            <input
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder={`Say something, ${username}`}
            />
            <button type="submit">Send</button>
          </form>
        </InputContainer>
      )}
    </SlackLayout>
  )
}) as NextPage<SSRProps>

interface QueryChannelAndMessagesResponse {
  queryMessagesByChannel: Message[]
}
interface SSRProps extends QueryChannelAndMessagesResponse {
  channelName?: string
}

export const getServerSideProps: GetServerSideProps<SSRProps> = async ({
  query,
}) => {
  const { channelName } = query

  const { queryMessagesByChannel } = await client.request<
    QueryChannelAndMessagesResponse
  >(QUERY_MESSAGES_BY_CHANNEL_QUERY, {
    channelName,
  })

  return {
    props: {
      channelName: Array.isArray(channelName) ? channelName[0] : channelName,
      queryMessagesByChannel,
    },
  }
}
