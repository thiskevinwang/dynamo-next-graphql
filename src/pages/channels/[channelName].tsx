import { NextPage, GetServerSideProps } from "next"
// import Link from "next/link"
// import { request } from "graphql-request"
// import styled from "styled-components"

import { SlackLayout } from "components/SlackLayout"

// const ENDPOINT = "http://localhost:4000"
// const GET_USER = `
// fragment Shared on User {
//   PK
//   SK
//   username
//   email
//   createdAt
//   updatedAt
// }

// query GetUser($username: String!, $email: String!) {
//   getUser(username: $username, email: $email) {
//     ...Shared
//   }
// }
// `

// interface User {
//   PK: string
//   SK: string
//   username?: string
//   fullname?: string
//   email?: string
//   createdAt?: string
//   updatedAt?: string
// }

export default (({ channelName }) => {
  return <SlackLayout title={channelName ?? "-"}></SlackLayout>
}) as NextPage<SSRProps>

interface SSRProps {
  channelName?: string
}

export const getServerSideProps: GetServerSideProps<SSRProps> = async ({
  query,
}) => {
  const { channelName } = query

  // const { getUser } = await request<SSRProps>(ENDPOINT, GET_USER, {
  //   email: "test",
  //   username: userId,
  // })
  return {
    props: {
      channelName: Array.isArray(channelName) ? channelName[0] : channelName,
    },
  }
}
