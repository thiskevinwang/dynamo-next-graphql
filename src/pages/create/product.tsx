import { useState } from "react"
import { NextPage } from "next"
import useSwr from "swr"
// import Link from "next/link"
import { request } from "graphql-request"
// import styled from "styled-components"

import { SlackLayout } from "components/SlackLayout"

const ENDPOINT = process.env.ENDPOINT as string
const FRAGMENT = `
fragment Shared on Product {
  PK
  SK
  createdAt
  updatedAt
  productName
}
  `
const QUERY_PRODUCTS = `
${FRAGMENT}
query QueryProducts {
  queryProducts {
    ...Shared
  }
}`

const CREATE_PRODUCT_MUTATION = `
${FRAGMENT}
mutation iPhone($productName: String!) {
  createProduct(productName: $productName) {
    ...Shared
  }
}
`

// interface Product {
//   PK: string
//   SK: string
//   createdAt?: string
//   updatedAt?: string
//   productName: string
// }

export default (() => {
  const { data, error } = useSwr(QUERY_PRODUCTS, (query) =>
    request(ENDPOINT, query)
  )

  const [productName, setProductName] = useState("")
  const [message, setMessage] = useState("")
  const mutate = () =>
    request(ENDPOINT, CREATE_PRODUCT_MUTATION, { productName })
      .then((res) => {
        console.log(res)
        setMessage("success")
      })
      .catch((err) => {
        console.log(err)
        setMessage(err.message)
      })

  if (error) return <>Error</>
  if (!data) return <>Loading</>
  return (
    <SlackLayout title={"Create a Product"}>
      <input
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
        placeholder={"productName"}
      />
      <button onClick={mutate}>Submit</button>
      <div>{message}</div>
    </SlackLayout>
  )
}) as NextPage

// export const getServerSideProps: GetServerSideProps<SSRProps> = async ({
//   query,
// }) => {
//   const { productId } = query
//   const { queryProductsByName } = await request<SSRProps>(
//     ENDPOINT,
//     QUERY_PRODUCTS_BY_NAME,
//     {
//       name: productId,
//     }
//   )
//   return {
//     props: { queryProductsByName },
//   }
// }
