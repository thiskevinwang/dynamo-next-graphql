import { NextPage, GetServerSideProps } from "next"
import { request } from "graphql-request"
import styled from "styled-components"

const ProductCard = styled.div`
  padding: 1rem;
  border: 1px dotted lightgrey;
  display: block;
  header {
    font-weight: bold;
  }
`

const ENDPOINT = "http://localhost:4000"
const QUERY_PRODUCTS_BY_NAME = `
query QueryProductsByName($name: String) {
  queryProductsByName(name: $name) {
    PK
    SK
    createdAt
    updatedAt
  }
}
`

interface Product {
  PK: string
  SK: string
  createdAt?: string
  updatedAt?: string
}

const Index: NextPage<SSRProps> = ({ queryProductsByName }) => {
  return (
    <>
      Products
      {queryProductsByName.map((product, i) => {
        return (
          <ProductCard key={`${product.PK}${i}`}>
            <header>PK: {product.PK}</header>
            <section>
              <div>SK: {product.SK}</div>
              <div>createdAt: {product.createdAt}</div>
              <div>updatedAt: {product.updatedAt}</div>
            </section>
          </ProductCard>
        )
      })}
    </>
  )
}

interface SSRProps {
  queryProductsByName: Product[]
}

export const getServerSideProps: GetServerSideProps<SSRProps> = async () => {
  const { queryProductsByName } = await request<SSRProps>(
    ENDPOINT,
    QUERY_PRODUCTS_BY_NAME,
    {
      name: "Poteko",
    }
  )
  return {
    props: { queryProductsByName },
  }
}

export default Index
