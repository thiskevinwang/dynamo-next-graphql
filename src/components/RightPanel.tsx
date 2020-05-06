import { FC } from "react"
import styled from "styled-components"
import useSwr from "swr"
import { request } from "graphql-request"

import { useRightPanel } from "hooks"

const ENDPOINT = process.env.ENDPOINT as string
const GET_USER_QUERY = `
query GetUser($username: String!, $email: String!) {
  getUser(username: $username, email: $email) {
    PK
    SK
    username
    updatedAt
    createdAt
    firstName
    lastName
    avatarUrl
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

const Top = styled.div`
  display: flex;
  justify-content: space-between;

  align-items: center;
  padding: 0 12px 0 16px;
  border-bottom: 1px solid lightgrey;
  height: 64px;
`
const Body = styled.div`
  img {
    max-width: 100%;
    width: 100%;
    background: lightgrey;
  }
  dd {
    margin: 0px;
    text-align: center;
  }
`

export const RightPanel: FC = () => {
  const { username, handleClear } = useRightPanel()
  const { data } = useSwr<{ getUser: User }>(
    username ? [GET_USER_QUERY, username] : null,
    (query, un) => {
      return request(ENDPOINT, query, {
        email: "TODO_THIS_DOES_NOTHING",
        username: un,
      })
    }
  )

  return (
    <>
      <Top>
        <span>Details</span>
        {username && <button onClick={handleClear}>X</button>}
      </Top>
      {username && data && (
        <Body>
          <img src={data?.getUser.avatarUrl} alt="user avatar" />
          <dd>
            <h1>{data?.getUser.username}</h1>
          </dd>
        </Body>
      )}
    </>
  )
}
