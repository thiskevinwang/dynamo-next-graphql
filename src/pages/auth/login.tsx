import { useReducer } from "react"
import { NextPage } from "next"
import { useRouter } from "next/router"
// import Link from "next/link"
import { request } from "graphql-request"
// import styled from "styled-components"
//
import { SlackLayout } from "components/SlackLayout"

const ENDPOINT = "http://localhost:4000"

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

const reducer = (state: any, action: any) => {
  return { ...state, ...action }
}
export default (() => {
  const router = useRouter()
  const [values, dispatch] = useReducer(reducer, {
    email: "kwangsan@gmail.com",
    password: "testtest",
    username: "adminzzz",
  })

  const handleSumbit = () => {
    request(ENDPOINT, LOGIN_MUTATION, values)
      .then((res) => {
        console.log(res.login.token)
        localStorage.setItem("TOKEN", res.login.token)
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
              onChange={(e) => dispatch({ [key]: e.target.value })}
            />
          </div>
        )
      })}
      <button onClick={handleSumbit}>Submit</button>
    </SlackLayout>
  )
}) as NextPage
