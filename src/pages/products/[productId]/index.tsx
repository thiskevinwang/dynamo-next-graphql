import { NextPage, GetServerSideProps } from "next"
import Link from "next/link"
import { request } from "graphql-request"
import styled from "styled-components"

import { SlackLayout } from "components/SlackLayout"

const Card = styled.div`
  padding: 1rem;
  border: 1px dotted lightgrey;
  display: block;
`

const ENDPOINT = "http://localhost:4000"
const GET_PRODUCT = `
fragment Shared on Product {
  PK
  SK
  createdAt
  updatedAt
  productName
}

query GetProduct($productName: String!) {
  getProduct(productName: $productName) {
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

export default (({ getProduct: e }) => {
  return (
    <SlackLayout title={"Product"}>
      <Card>
        <h2>
          <Link
            href={"/products/[productId]/"}
            as={`/products/${e.productName}`}
          >
            <a>{e.productName}</a>
          </Link>
        </h2>

        {Object.entries(e).map(([key, value]) => {
          return (
            <div key={key}>
              <code>
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
      </Card>
    </SlackLayout>
  )
}) as NextPage<SSRProps>

interface SSRProps {
  getProduct: Product
}

export const getServerSideProps: GetServerSideProps<SSRProps> = async ({
  query,
}) => {
  const { productId } = query
  const { getProduct } = await request<SSRProps>(ENDPOINT, GET_PRODUCT, {
    productName: productId,
  })
  return {
    props: { getProduct },
  }
}
