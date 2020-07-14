import { NextPage } from "next"
import styled from "styled-components"

import { SlackLayout } from "components/SlackLayout"

const Card = styled.div`
  padding: 1rem;
  border: 1px dotted lightgrey;
  display: block;
`

const UserPage: NextPage = () => {
  return (
    <SlackLayout title={"User"}>
      <Card></Card>
    </SlackLayout>
  )
}
export default UserPage
