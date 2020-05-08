import { NextPage, GetServerSideProps } from "next"
import Link from "next/link"
import { request } from "graphql-request"
// import styled from "styled-components"

import { SlackLayout } from "components/SlackLayout"

const ENDPOINT = process.env.ENDPOINT as string
const QUERY_USERS = `
query QueryUsers {
  queryUsers {
    PK
    SK
    username
    firstName
    lastName
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
  firstName?: string
  lastName?: string
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
