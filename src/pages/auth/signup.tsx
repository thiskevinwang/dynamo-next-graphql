import { useReducer } from "react"
import { NextPage } from "next"
// import Link from "next/link"
import { request } from "graphql-request"
// import styled from "styled-components"
//
import { SlackLayout } from "components/SlackLayout"

const ENDPOINT = "http://localhost:4000"

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

const reducer = (state: any, action: any) => {
  return { ...state, ...action }
}
export default (() => {
  const [values, dispatch] = useReducer(reducer, {
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    username: "",
  })

  const handleSumbit = () => {
    request(ENDPOINT, SIGNUP_MUTATION, values)
      .then((res) => {
        console.log(res.signup.token)
        localStorage.setItem("TOKEN", res.signup.token)
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
