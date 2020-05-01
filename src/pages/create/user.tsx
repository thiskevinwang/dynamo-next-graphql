import { useState } from "react"
import { NextPage } from "next"
import useSwr from "swr"
// import Link from "next/link"
import { request } from "graphql-request"
// import styled from "styled-components"

import { SlackLayout } from "components/SlackLayout"

const ENDPOINT = "http://localhost:4000"

const FRAGMENT = `
fragment Shared on User {
  PK
  SK
  username
  email
  createdAt
  updatedAt
}
`

const QUERY_USERS = `
${FRAGMENT}
query QueryUsers {
  queryUsers {
    ...Shared
  }
}
`

const CREATE_USER_MUTATION = `
${FRAGMENT}
mutation User($username: String!, $email: String!) {
  createUser(username: $username, email: $email) {
    ...Shared
  }
}
`

// interface User {
//   PK: string
//   SK: string
//   username?: string
//   fullname?: string
//   email?: string
//   createdAt?: string
//   updatedAt?: string
// }

export default (() => {
  const { data, error } = useSwr(QUERY_USERS, (query) =>
    request(ENDPOINT, query)
  )

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const mutate = () =>
    request(ENDPOINT, CREATE_USER_MUTATION, { username, email })
      .then((res) => {
        console.log(res)
        setMessage("success")
      })
      .catch((err) => {
        console.log(err)
        setMessage(err.message)
      })

  if (error) return <>Error</>
  if (!data) return <>Loading</>

  return (
    <SlackLayout>
      <h1>Create a User</h1>
      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder={"username"}
      />
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={"email"}
      />
      <button onClick={mutate}>Submit</button>
      <div>{message}</div>
    </SlackLayout>
  )
}) as NextPage
