import { NextPage } from "next"
import Link from "next/link"
// import styled from "styled-components"

import { Layout } from "components/Layout"

export default (() => {
  return (
    <Layout>
      <h1>Create</h1>
      <ul>
        <li>
          <Link href={"/create/product"}>
            <a>a Product</a>
          </Link>
        </li>
        <li>
          <Link href={"/create/user"}>
            <a>a User</a>
          </Link>
        </li>
      </ul>
    </Layout>
  )
}) as NextPage
