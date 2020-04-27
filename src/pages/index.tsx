import { request } from "graphql-request"
import useSWR from "swr"
import styled from "styled-components"

const SnackCard = styled.div`
  padding: 1rem;
  border: 1px dotted lightgrey;
  display: block;

  font-size: 0.8rem;

  header {
    font-weight: bold;
  }
  img {
    height: 80px;
    width: 80px;
    background-color: lightgrey;
  }
`

const API = "http://localhost:4000"
const query = `
{
  querySnacks(category: "Sweet") {
    PK
    SK
    DisplayName
    Tastes
    Textures
    Rating
    ImageUrls
  }
}
`

interface Snack {
  PK: string
  SK: string
  DisplayName: string
  Tastes: string[]
  Textures: string[]
  Rating: number
  ImageUrls: string[]
}

export default () => {
  const { data, error } = useSWR<{ querySnacks: Snack[] }>(query, (query) =>
    request(API, query)
  )

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  return data.querySnacks.map((snack, i) => {
    return (
      <SnackCard key={`${snack.PK}${i}`}>
        <header>
          <h1>{snack.DisplayName}</h1>
        </header>
        <img src={snack.ImageUrls?.[0]}></img>
        <h2>Tastes</h2>
        <ul>
          {snack.Tastes?.map((taste) => {
            return <li key={taste}>{taste}</li>
          })}
        </ul>
        <h2>Textures</h2>
        <ul>
          {snack.Textures?.map((texture) => {
            return <li key={texture}>{texture}</li>
          })}
        </ul>
      </SnackCard>
    )
  })
}
