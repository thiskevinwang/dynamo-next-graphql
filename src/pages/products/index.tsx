import { NextPage, GetServerSideProps } from "next"
import Link from "next/link"
import { request } from "graphql-request"
import styled from "styled-components"

import { Layout } from "components/Layout"

const Card = styled.div`
  padding: 1rem;
  border: 1px dotted lightgrey;
  display: block;
`

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
      {queryProducts.map((e, i) => {
        return (
          <Card key={`${e.PK}${i}`}>
            <h2>{e.productName}</h2>
            <section>
              {Object.entries(e).map(([key, value]) => {
                return (
                  <div>
                    <code key={key}>
                      {key}: {value}
                    </code>
                  </div>
                )
              })}
              <Link
                href={"/products/[productId]/votes"}
                as={`/products/${e.productName}/votes`}
              >
                <a>Votes</a>
              </Link>
            </section>
          </Card>
        )
      })}
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
