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
const QUERY_VOTES_BY_EMAIL = `
query QueryVotesByEmail($email: String) {
  queryVotesByEmail(email: $email) {
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

const Votes: NextPage<SSRProps> = ({ queryVotesByEmail, userId }) => {
  return (
    <Layout>
      <h1>{userId}'s Votes</h1>
      {queryVotesByEmail.map((e) => {
        return (
          <Card key={`${e.PK}${e.SK}`}>
            <h2>{e.productName}</h2>
            <Link
              href={"/products/[productId]"}
              as={`/products/${e.productName}`}
            >
              <a>{e.productName}</a>
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
    </Layout>
  )
}

interface SSRProps {
  queryVotesByEmail: Vote[]
  userId?: string | string[]
}

export const getServerSideProps: GetServerSideProps<SSRProps> = async ({
  query,
}) => {
  const { userId } = query

  const { queryVotesByEmail } = await request<SSRProps>(
    ENDPOINT,
    QUERY_VOTES_BY_EMAIL,
    {
      email: userId,
    }
  )
  return {
    props: { queryVotesByEmail, userId },
  }
}

export default Votes
