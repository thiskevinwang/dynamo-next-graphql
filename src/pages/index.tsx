import { NextPage } from "next"

import { SlackLayout } from "components/SlackLayout"
import { ThemePreview } from "components/ThemePreview"

const Home: NextPage = () => {
  return (
    <SlackLayout title={"Home"}>
      <ThemePreview />
    </SlackLayout>
  )
}

export default Home
