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
const Rating = styled.div`
  border-radius: 100%;
  border: 1px solid black;
  height: 40px;
  width: 40px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
`

const ENDPOINT = "http://localhost:4000"
const QUERY_VOTES_BY_PRODUCT = `
query QueryVotesByProduct($productName: String) {
  queryVotesByProduct(productName: $productName) {
    PK
    SK
    productName
    username
    createdAt
    updatedAt
    rating
  }
}
`

interface Vote {
  PK: string
  SK: string
  productName: string
  username: string
  createdAt?: string
  updatedAt?: string
  rating?: string
}

const Votes: NextPage<SSRProps> = ({ queryVotesByProduct, productId }) => {
  return (
    <SlackLayout>
      <h1>Votes for {productId}</h1>
      <h2>Average Rating</h2>

      <Rating>
        {queryVotesByProduct.reduce(
          (initial, current) => initial + parseFloat(current.rating as string),
          0
        ) / queryVotesByProduct.length}
      </Rating>

      {queryVotesByProduct.map((e) => {
        return (
          <Card key={`${e.PK}${e.SK}`}>
            <Link href={"/users/[userId]"} as={`/users/${e.username}`}>
              <a>{e.username}</a>
            </Link>

            <section>
              {Object.entries(e).map(([key, value]) => {
                return (
                  <div key={key}>
                    <code>
                      {key}: {value}
                    </code>
                  </div>
                )
              })}
            </section>
          </Card>
        )
      })}
    </SlackLayout>
  )
}

interface SSRProps {
  queryVotesByProduct: Vote[]
  productId?: string | string[]
}

export const getServerSideProps: GetServerSideProps<SSRProps> = async ({
  query,
}) => {
  const { productId } = query

  const { queryVotesByProduct } = await request<SSRProps>(
    ENDPOINT,
    QUERY_VOTES_BY_PRODUCT,
    {
      productName: productId,
    }
  )
  return {
    props: { queryVotesByProduct, productId },
  }
}

export default Votes
