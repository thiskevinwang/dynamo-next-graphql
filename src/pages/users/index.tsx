import { NextPage, GetServerSideProps } from "next"
import Link from "next/link"
import { request } from "graphql-request"
// import styled from "styled-components"

import { SlackLayout } from "components/SlackLayout"

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
    <SlackLayout title={"Users"}>
      <ul>
        {queryUsers.map((e) => {
          return (
            <li key={`${e.PK}`}>
              <Link href={"/users/[userId]"} as={`/users/${e.username}`}>
                <a>{e.username}</a>
              </Link>
            </li>
          )
        })}
      </ul>
    </SlackLayout>
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
