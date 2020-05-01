import { NextPage, GetServerSideProps } from "next"
import Link from "next/link"
import { request } from "graphql-request"
// import styled from "styled-components"

import { Layout } from "components/Layout"

const ENDPOINT = "http://localhost:4000"
const QUERY_PRODUCTS = `
fragment Shared on Product {
  PK
  SK
  createdAt
  updatedAt
  productName
}

query QueryProducts {
  queryProducts {
    ...Shared
  }
}
`

interface Product {
  PK: string
  SK: string
  createdAt?: string
  updatedAt?: string
  productName: string
}

export default (({ queryProducts }) => {
  return (
    <Layout>
      <h1>Products</h1>
      <ul>
        {queryProducts.map((e) => {
          return (
            <li key={`${e.PK}`}>
              <Link
                href={"/products/[productId]"}
                as={`/products/${e.productName}`}
              >
                <a>{e.productName}</a>
              </Link>
            </li>
          )
        })}
      </ul>
    </Layout>
  )
}) as NextPage<SSRProps>

interface SSRProps {
  queryProducts: Product[]
}

export const getServerSideProps: GetServerSideProps<SSRProps> = async () => {
  const { queryProducts } = await request<SSRProps>(ENDPOINT, QUERY_PRODUCTS, {
    name: "Poteko",
  })
  return {
    props: { queryProducts },
  }
}
