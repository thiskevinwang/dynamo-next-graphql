import { NextPage } from "next"
import Link from "next/link"
// import styled from "styled-components"

import { SlackLayout } from "components/SlackLayout"

export default (() => {
  return (
    <SlackLayout title={"Create"}>
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
    </SlackLayout>
  )
}) as NextPage
