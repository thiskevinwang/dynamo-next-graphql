import { useReducer, useState, useEffect, FormEvent } from "react"
import { NextPage, GetServerSideProps } from "next"
import useSwr from "swr"
import { GraphQLClient } from "graphql-request"
import styled from "styled-components"

import { SlackLayout } from "components/SlackLayout"
import { useAuth } from "hooks"

const ENDPOINT = process.env.ENDPOINT as string
const client = new GraphQLClient(ENDPOINT)

const ROW_FRAGMENT = `
fragment Row on Row {
  PK
  SK
  createdAt
  updatedAt
}
`

const GET_USER = `
${ROW_FRAGMENT}
query GetUser($username: String!, $email: String!) {
  getUser(username: $username, email: $email) {
    ...Row
  firstName
  lastName
  username
  email
  avatarUrl
  }
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
interface User {
  PK: string
  SK: string
  username?: string
  firstName?: string
  lastName?: string
  email?: string
  createdAt?: string
  updatedAt?: string
  avatarUrl?: string
}

interface Message {
  PK: string
  SK: string
  createdAt: string
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

enum UserActionType {
  SET_USER = "SET_USER",
}
type UserAction = {
  type: UserActionType
  data: User
  username: string
}
const usersReducer = (
  state: { [username: string]: User },
  action: UserAction
) => {
  switch (action.type) {
    case UserActionType.SET_USER:
      return { ...state, [action.username]: action.data }
    default:
      return state
  }
}
const Message = styled.div`
  display: grid;
  grid-template-columns: 50px auto;
  padding-top: 5px;
  padding-bottom: 5px;

  transition: background 100ms ease-in-out;
  :hover {
    background: lightgrey;
  }

  > div:first-child {
    display: flex;
    justify-content: flex-end;
  }
  > div:nth-child(2) {
    padding-left: 10px;
  }
`
const Img = styled.img`
  height: 40px;
  width: 40px;
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

  /**
   * do extra client-side fetching for users.
   * - message only have username, and no avatarUrl
   */
  const [users, dispatch] = useReducer(usersReducer, {})
  useEffect(() => {
    ;(data?.queryMessagesByChannel ?? messages)
      .reduce((prev, curr) => {
        if (!prev.includes(curr.username)) {
          prev.push(curr.username)
        }
        return prev
      }, [] as string[])
      .map((username) =>
        client
          .request<{ getUser: User }>(GET_USER, {
            username,
            email: "TODO_THIS_IS_NOT_USED",
          })
          .then(({ getUser: u }) => {
            dispatch({
              type: UserActionType.SET_USER,
              username: u.username as string,
              data: u,
            })
          })
      )
  }, [data?.queryMessagesByChannel, messages])

  return (
    <SlackLayout title={channelName ?? "-"}>
      {(data?.queryMessagesByChannel ?? messages)
        .sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        )
        .map((message) => {
          const { PK, SK, body } = message
          return (
            <Message key={`${PK}${SK}`}>
              <div>
                <Img src={users[message.username]?.avatarUrl}></Img>
              </div>
              <div>
                <b>{message.username}</b>&nbsp;
                <small>
                  {new Date(message.createdAt as string).toLocaleTimeString(
                    "en-US"
                  )}
                </small>
                <div>{body}</div>
              </div>
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
