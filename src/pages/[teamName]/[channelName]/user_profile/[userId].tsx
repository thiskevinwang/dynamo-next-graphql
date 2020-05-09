// import { NextPage, GetServerSideProps } from "next"
// import { SlackLayout } from "components/SlackLayout"

// const Channel: NextPage<SSRProps> = ({ teamName, channelName, userId }) => {
//   return (
//     <SlackLayout title={"User"}>
//       <div>teamName: {teamName}</div>
//       <div>channelName: {channelName}</div>
//       <div>userId: {userId}</div>
//     </SlackLayout>
//   )
// }

// interface SSRProps {
//   teamName?: string | string[]
//   channelName?: string | string[]
//   userId?: string | string[]
// }

// export const getServerSideProps: GetServerSideProps<SSRProps> = async ({
//   query,
// }) => {
//   const { teamName, channelName, userId } = query

//   return {
//     props: { teamName, channelName, userId },
//   }
// }

// export default Team

import { Fragment, useReducer, useState, useEffect, FormEvent } from "react"
import { NextPage, GetServerSideProps } from "next"
import useSwr from "swr"
import { GraphQLClient } from "graphql-request"
import styled, { BaseProps } from "styled-components"

import { SlackLayout } from "components/SlackLayout"
import { useAuth, useRightPanel } from "hooks"

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
const Sticky = styled.div`
  position: sticky;
  top: 1.5rem;
  transform: translateY(-50%);
`
const MessageListDayDivider = styled.div`
  height: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
`
const Day = styled.small`
  font-weight: 500;
  position: absolute;
  border: 1px solid ${(p: BaseProps) => p.theme.muted};
  border-radius: 24px;
  height: 28px;
  line-height: 27px;
  padding: 0 16px;
  background: ${(p: BaseProps) => p.theme.background};
  z-index: 5;
`

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
const DateGroup = styled.div`
  border-bottom: 1px solid ${(p: BaseProps) => p.theme.muted};
  padding-bottom: 1rem;
`
const Message = styled.div`
  display: grid;
  grid-template-columns: 48px auto;
  padding: 8px 20px;

  transition: background 100ms ease-in-out;
  :hover {
    background: ${(p: BaseProps) => p.theme.muted};
  }
`
const Img = styled.img`
  height: 40px;
  width: 40px;
`

const SmallDate = styled.small`
  color: ${(p: BaseProps) => p.theme.textTime};
`

let initialDate = ``

const Channel: NextPage<SSRProps> = ({
  channelName,
  queryMessagesByChannel: messages,
  /**
   * @todo teamName and userId aren't used yet.
   */
  // teamName,
  // userId,
}) => {
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
    [QUERY_MESSAGES_BY_CHANNEL_QUERY, channelName],
    (query, cn) => {
      return client.request(query, { channelName: cn })
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

  const { handleSet } = useRightPanel()

  /**
   * to help generate parent <div>s for sticky date
   */
  const grouped = (data?.queryMessagesByChannel ?? messages)
    .sort(
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    )
    .reduce((group, i) => {
      // Date Key & Display
      const date = new Date(i.createdAt)

      const weekday = DAYS[date.getDay()]
      const month = MONTHS[date.getMonth()]
      const day = date.getDate()

      const c = `${weekday}, ${month} ${day}${nth(day)}`

      if (Array.isArray(group[c])) {
        group[c].push(i)
      } else {
        group[c] = [i]
      }
      return group
    }, {} as { [date: string]: Message[] })

  return (
    <SlackLayout title={channelName ?? "-"}>
      {Object.entries(grouped).map(([date, messages], i) => {
        return (
          <DateGroup key={`${date}${i}`}>
            {messages.map((message) => {
              const { PK, SK, body, username, createdAt } = message

              const buildMessage = (
                <Message key={`${PK}${SK}`} onClick={() => handleSet(username)}>
                  <div>
                    <Img src={users[username]?.avatarUrl}></Img>
                  </div>
                  <div>
                    <b>{username}</b>&nbsp;
                    <SmallDate>
                      {new Date(createdAt as string).toLocaleTimeString(
                        "en-US"
                      )}
                    </SmallDate>
                    <div>{body}</div>
                  </div>
                </Message>
              )

              if (date !== initialDate) {
                initialDate = date
                return (
                  <Fragment key={`${PK}${SK}${date}`}>
                    <Sticky>
                      <MessageListDayDivider>
                        <Day>{date}</Day>
                      </MessageListDayDivider>
                    </Sticky>
                    {buildMessage}
                  </Fragment>
                )
              }

              return buildMessage
            })}
          </DateGroup>
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
}

export default Channel

interface QueryChannelAndMessagesResponse {
  queryMessagesByChannel: Message[]
}
interface SSRProps extends QueryChannelAndMessagesResponse {
  teamName?: string
  channelName?: string
  userId?: string
}

export const getServerSideProps: GetServerSideProps<SSRProps> = async ({
  query,
}) => {
  const { teamName, channelName, userId } = query

  const { queryMessagesByChannel } = await client.request<
    QueryChannelAndMessagesResponse
  >(QUERY_MESSAGES_BY_CHANNEL_QUERY, {
    channelName,
  })

  return {
    props: {
      teamName: Array.isArray(teamName) ? teamName[0] : teamName,
      channelName: Array.isArray(channelName) ? channelName[0] : channelName,
      userId: Array.isArray(userId) ? userId[0] : userId,
      queryMessagesByChannel,
    },
  }
}

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]
const DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
]
const nth = function (d: number) {
  if (d > 3 && d < 21) return "th"
  switch (d % 10) {
    case 1:
      return "st"
    case 2:
      return "nd"
    case 3:
      return "rd"
    default:
      return "th"
  }
}
