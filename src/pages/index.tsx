import { NextPage } from "next"
import Link from "next/link"
// import styled from "styled-components"

import { Layout } from "components/Layout"

export default (() => {
  return (
    <Layout>
      <h1>Home</h1>
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
    </Layout>
  )
}) as NextPage
