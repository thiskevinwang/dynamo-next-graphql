import { NextPage, GetServerSideProps } from "next"
import { request } from "graphql-request"
import styled from "styled-components"

const VoteCard = styled.div`
  padding: 1rem;
  border: 1px dotted lightgrey;
  display: block;
  header {
    font-weight: bold;
  }
`

const ENDPOINT = "http://localhost:4000"
const QUERY_VOTES_BY_PRODUCT = `
query QueryVotesByProduct($name: String) {
  queryVotesByProduct(name: $name) {
    PK
    SK
    productName
    createdAt
    rating
  }
}
`

interface Vote {
  PK: string
  SK: string
  createdAt?: string
  updatedAt?: string
  rating?: string
}

const Votes: NextPage<SSRProps> = ({ queryVotesByProduct }) => {
  return (
    <>
      Votes
      {queryVotesByProduct.map((vote, i) => {
        return (
          <VoteCard key={`${vote.PK}${i}`}>
            <header>PK: {vote.PK}</header>
            <section>
              <div>SK: {vote.SK}</div>
              <div>createdAt: {vote.createdAt}</div>
              <div>updatedAt: {vote.updatedAt}</div>
              <div>rating: {vote.rating}</div>
            </section>
          </VoteCard>
        )
      })}
    </>
  )
}

interface SSRProps {
  queryVotesByProduct: Vote[]
}

export const getServerSideProps: GetServerSideProps<SSRProps> = async ({
  query,
}) => {
  const { productId } = query

  const { queryVotesByProduct } = await request<SSRProps>(
    ENDPOINT,
    QUERY_VOTES_BY_PRODUCT,
    {
      name: productId,
    }
  )
  return {
    props: { queryVotesByProduct },
  }
}

export default Votes
