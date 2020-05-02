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
const Body = styled.div``
interface Props {
  email: string
  username: string
}
export const RightPanel: FC<Props> = ({ email, username }) => {
  const { data, error } = useSwr<{ getUser: User }>(
    GET_USER_QUERY,
    (query) => request(ENDPOINT, query, { email, username }),
    {}
  )

  return (
    <>
      <Top>
        <span>Right Panel</span>
      </Top>
      <Body>
        {!data || error
          ? "Loading"
          : Object.entries(data.getUser).map(([key, value]) => {
              return (
                <div key={key}>
                  <code>
                    {key}: {value}
                  </code>
                </div>
              )
            })}
      </Body>
    </>
  )
}
