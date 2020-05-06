import { useReducer } from "react"
import { NextPage } from "next"
import { useRouter } from "next/router"
// import Link from "next/link"
import { request } from "graphql-request"
// import styled from "styled-components"

import { useAuth } from "hooks"
import { SlackLayout } from "components/SlackLayout"

const ENDPOINT = process.env.ENDPOINT as string

const LOGIN_MUTATION = `
mutation Login(
  $email: String!
  $password: String!
  $username: String!
) {
  login(
    email: $email
    password: $password
    username: $username
  ) {
    token
  }
}
`
interface LoginMutationResponse {
  login: {
    token: string
  }
}
const reducer = (state: any, action: any) => {
  return { ...state, ...action }
}
export default (() => {
  const { handleLogin } = useAuth()

  const router = useRouter()
  const [values, dispatch] = useReducer(reducer, {
    email: "kwangsan@gmail.com",
    password: "testtest",
    username: "adminzzz",
  })

  const handleSumbit = () => {
    request<LoginMutationResponse>(ENDPOINT, LOGIN_MUTATION, values)
      .then((res) => {
        handleLogin(res.login.token)
      })
      .catch((err) => {
        console.error(err)
        throw err
      })
      .finally(() => {
        router.replace("/")
      })
  }
  return (
    <SlackLayout title={"Login"}>
      {Object.keys(values).map((key) => {
        return (
          <div key={key}>
            <input
              value={values[key]}
              placeholder={key}
              type={key}
              onChange={(e) => dispatch({ [key]: e.target.value })}
            />
          </div>
        )
      })}
      <button onClick={handleSumbit}>Submit</button>
    </SlackLayout>
  )
}) as NextPage
