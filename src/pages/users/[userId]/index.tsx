import { NextPage, GetServerSideProps } from "next"
import Link from "next/link"
import { request } from "graphql-request"
import styled from "styled-components"

import { SlackLayout } from "components/SlackLayout"

const Card = styled.div`
  padding: 1rem;
  border: 1px dotted lightgrey;
  display: block;
`

const ENDPOINT = "http://localhost:4000"
const GET_USER = `
fragment Shared on User {
  PK
  SK
  username
  email
  createdAt
  updatedAt
}

query GetUser($username: String!, $email: String!) {
  getUser(username: $username, email: $email) {
    ...Shared
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

export default (({ getUser: e }) => {
  return (
    <SlackLayout title={"User"}>
      <Card>
        <h2>
          <Link href={"/users/[userId]/"} as={`/users/${e.username}`}>
            <a>{e.username}</a>
          </Link>
        </h2>
        <section>
          {Object.entries(e).map(([key, value]) => {
            return (
              <div key={key}>
                <code>
                  {key}: {value}
                </code>
              </div>
            )
          })}
          <Link
            href={"/users/[userId]/votes"}
            as={`/users/${e.username}/votes`}
          >
            <a>Votes</a>
          </Link>
        </section>
      </Card>
    </SlackLayout>
  )
}) as NextPage<SSRProps>

interface SSRProps {
  getUser: User
}

export const getServerSideProps: GetServerSideProps<SSRProps> = async ({
  query,
}) => {
  const { userId } = query
  const { getUser } = await request<SSRProps>(ENDPOINT, GET_USER, {
    email: "test",
    username: userId,
  })
  return {
    props: { getUser },
  }
}
