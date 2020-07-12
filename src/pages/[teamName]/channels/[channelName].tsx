import { useState } from "react"
import { NextPage, GetStaticProps, GetStaticPaths } from "next"
import styled from "styled-components"

import { SlackLayout } from "components/SlackLayout"
import {
  useAuth,
  // useRightPanel
} from "hooks"

// const Sticky = styled.div`
//   position: sticky;
//   top: 1.5rem;
//   transform: translateY(-50%);
// `
// const MessageListDayDivider = styled.div`
//   height: 1rem;
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `
// const Day = styled.small`
//   font-weight: 500;
//   position: absolute;
//   border: 1px solid ${(p: BaseProps) => p.theme.muted};
//   border-radius: 24px;
//   height: 28px;
//   line-height: 27px;
//   padding: 0 16px;
//   background: ${(p: BaseProps) => p.theme.background};
//   z-index: 5;
// `

const InputContainer = styled.div`
  position: absolute;
  bottom: 1rem;
  display: flex;
  justify-content: center;
  width: 100%;
  > form {
    display: flex;
    justify-content: center;
    width: 100%;
  }
  input {
    width: 90%;
  }
`

// const DateGroup = styled.div`
//   border-bottom: 1px solid ${(p: BaseProps) => p.theme.muted};
//   padding-bottom: 1rem;
// `
// const Message = styled.div`
//   display: grid;
//   grid-template-columns: 48px auto;
//   padding: 8px 20px;

//   transition: background 100ms ease-in-out;
//   :hover {
//     background: ${(p: BaseProps) => p.theme.muted};
//   }
// `
// const Img = styled.img`
//   height: 40px;
//   width: 40px;
// `

// const SmallDate = styled.small`
//   color: ${(p: BaseProps) => p.theme.textTime};
// `

// let initialDate = ``

export default (({ channelName }) => {
  const { username } = useAuth()
  const [body, setBody] = useState("")

  // const { handleSet } = useRightPanel()

  return (
    <SlackLayout title={channelName ?? "-"}>
      {username && (
        <InputContainer>
          <form onSubmit={() => {}}>
            <input
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder={`Say something, ${username}`}
            />
            <button type="submit">Send</button>
          </form>
        </InputContainer>
      )}
    </SlackLayout>
  )
}) as NextPage<SSRProps>

interface SSRProps {
  channelName?: string
}

export const getStaticProps: GetStaticProps<
  any,
  {
    teamName?: string
    channelName?: string
  }
> = async ({ params }) => {
  const { teamName, channelName } = params ?? {}

  return {
    props: {
      teamName: Array.isArray(teamName) ? teamName[0] : teamName,
      channelName: Array.isArray(channelName) ? channelName[0] : channelName,
    },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const teamNames = ["Rust", "TypeScript", "GraphQL", "Kotlin"]
  const channelNames = [
    "all_unreads",
    "threads",
    "mentions_and_reactions",
    "drafts",
    "saved_items",
    "people",
    "apps",
    "files",
  ]

  let paths: { params: { teamName: string; channelName: string } }[] = []
  teamNames.forEach((teamName) => {
    channelNames.forEach((channelName) => {
      paths.push({ params: { teamName, channelName } })
    })
  })
  return {
    paths,
    fallback: false, // See the "fallback" section below
  }
}

// const MONTHS = [
//   "January",
//   "February",
//   "March",
//   "April",
//   "May",
//   "June",
//   "July",
//   "August",
//   "September",
//   "October",
//   "November",
//   "December",
// ]
// const DAYS = [
//   "Sunday",
//   "Monday",
//   "Tuesday",
//   "Wednesday",
//   "Thursday",
//   "Friday",
//   "Saturday",
// ]
// const nth = function (d: number) {
//   if (d > 3 && d < 21) return "th"
//   switch (d % 10) {
//     case 1:
//       return "st"
//     case 2:
//       return "nd"
//     case 3:
//       return "rd"
//     default:
//       return "th"
//   }
// }
