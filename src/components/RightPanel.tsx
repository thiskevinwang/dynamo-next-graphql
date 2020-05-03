import { FC } from "react"
import styled from "styled-components"
import useSwr from "swr"
import { request } from "graphql-request"

const ENDPOINT = "http://localhost:4000"
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
  align-items: center;
  border-bottom: 1px solid lightgrey;
  height: 64px;
  span {
    padding: 1rem;
  }
`
const Body = styled.div`
  img {
    max-width: 100%;

    background: lightgrey;
  }
  dd {
    margin: 0px;
    text-align: center;
  }
`
interface Props {
  email: string
  username: string
}
export const RightPanel: FC<Props> = ({ email, username }) => {
  const { data } = useSwr<{ getUser: User }>(GET_USER_QUERY, (query) =>
    request(ENDPOINT, query, { email, username })
  )

  return (
    <>
      <Top>
        <span>Details</span>
      </Top>
      <Body>
        <img src={data?.getUser.avatarUrl} alt="user avatar" />
        <dd>
          <h1>{data?.getUser.username}</h1>
        </dd>
      </Body>
    </>
  )
}
