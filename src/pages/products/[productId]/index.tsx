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
const QUERY_PRODUCTS_BY_NAME = `
fragment Shared on Product {
  PK
  SK
  createdAt
  updatedAt
  productName
}
query QueryProductsByName($name: String) {
  queryProductsByName(name: $name) {
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

export default (({ queryProductsByName }) => {
  return (
    <Layout>
      <h1>Products By Name</h1>
      {queryProductsByName.map((e, i) => {
        return (
          <Card key={`${e.PK}${i}`}>
            <h2>
              <Link
                href={"/products/[productId]/votes"}
                as={`/products/${e.PK.replace("PRODUCT#", "")}/votes`}
              >
                <a>PK: {e.PK}</a>
              </Link>
            </h2>
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
            </section>
          </Card>
        )
      })}
    </Layout>
  )
}) as NextPage<SSRProps>

interface SSRProps {
  queryProductsByName: Product[]
}

export const getServerSideProps: GetServerSideProps<SSRProps> = async ({
  query,
}) => {
  const { productId } = query
  const { queryProductsByName } = await request<SSRProps>(
    ENDPOINT,
    QUERY_PRODUCTS_BY_NAME,
    {
      name: productId,
    }
  )
  return {
    props: { queryProductsByName },
  }
}
