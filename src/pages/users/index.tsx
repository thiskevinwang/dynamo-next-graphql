import { NextPage, GetServerSideProps } from "next"
import Link from "next/link"
import { request } from "graphql-request"
import styled from "styled-components"

import { Layout } from "components/Layout"

const Card = styled.div`
  padding: 1rem;
  border: 1px dotted lightgrey;
  display: block;
`

const ENDPOINT = "http://localhost:4000"
const QUERY_USERS = `
query QueryUsers {
  queryUsers {
    PK
    SK
    username
    fullname
    email
    createdAt
    updatedAt
  }
}
`

interface User {
  PK: string
  SK: string
  username?: string
  fullname?: string
  email?: string
  createdAt?: string
  updatedAt?: string
}

export default (({ queryUsers }) => {
  return (
    <Layout>
      <h1>Users</h1>
      {queryUsers.map((e, i) => {
        return (
          <Card key={`${e.PK}${i}`}>
            <h2>{e.username}</h2>
            <section>
              {Object.entries(e).map(([key, value]) => {
                return (
                  <div>
                    <code key={key}>
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
        )
      })}
    </Layout>
  )
}) as NextPage<SSRProps>

interface SSRProps {
  queryUsers: User[]
}

export const getServerSideProps: GetServerSideProps<SSRProps> = async () => {
  const { queryUsers } = await request<SSRProps>(ENDPOINT, QUERY_USERS, {
    name: "Poteko",
  })
  return {
    props: { queryUsers },
  }
}
