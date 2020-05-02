import { NextPage } from "next"
import { useRouter } from "next/router"

import { SlackLayout } from "components/SlackLayout"
import { useAuth } from "hooks"

export default (() => {
  const {
    authState: { token },
  } = useAuth()
  const router = useRouter()

  if (typeof token !== "undefined") {
    router.replace("/")
  }

  return <SlackLayout title={"Logout"}>You're logged out!</SlackLayout>
}) as NextPage
