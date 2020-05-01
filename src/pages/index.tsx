import { NextPage } from "next"
import Link from "next/link"
// import styled from "styled-components"
//
// import { Layout } from "components/Layout"
import { SlackLayout } from "components/SlackLayout"

export default (() => {
  return (
    <SlackLayout title={"Home"}>
      <ul>
        <li>
          <Link href={"/products"}>
            <a>Products</a>
          </Link>
        </li>
        <li>
          <Link href={"/users"}>
            <a>Users</a>
          </Link>
        </li>
      </ul>
    </SlackLayout>
  )
}) as NextPage
