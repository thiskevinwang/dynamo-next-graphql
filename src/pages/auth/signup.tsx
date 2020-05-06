import { useReducer } from "react"
import { NextPage } from "next"
// import Link from "next/link"
import { request } from "graphql-request"
// import styled from "styled-components"
//
import { SlackLayout } from "components/SlackLayout"
import { useAuth } from "hooks"

const ENDPOINT = process.env.ENDPOINT as string

const SIGNUP_MUTATION = `
mutation Signup(
  $email: String!
  $password: String!
  $firstName: String!
  $lastName: String!
  $username: String!
) {
  signup(
    email: $email
    password: $password
    firstName: $firstName
    lastName: $lastName
    username: $username
  ) {
    token
  }
}
`
interface SignupMutationResponse {
  signup: {
    token: string
  }
}

const reducer = (state: any, action: any) => {
  return { ...state, ...action }
}
export default (() => {
  const { handleLogin } = useAuth()

  const [values, dispatch] = useReducer(reducer, {
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    username: "",
  })

  const handleSumbit = () => {
    request<SignupMutationResponse>(ENDPOINT, SIGNUP_MUTATION, values)
      .then((res) => {
        handleLogin(res.signup.token)
      })
      .catch((err) => {
        console.error(err)
      })
  }
  return (
    <SlackLayout title={"Signup"}>
      {Object.keys(values).map((key) => {
        return (
          <div key={key}>
            <input
              value={values[key]}
              type={key}
              placeholder={key}
              onChange={(e) => dispatch({ [key]: e.target.value })}
            />
          </div>
        )
      })}
      <button onClick={handleSumbit}>Submit</button>
    </SlackLayout>
  )
}) as NextPage
