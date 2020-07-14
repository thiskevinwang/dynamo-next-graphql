import { FC } from "react"
import styled from "styled-components"

import { useRightPanel } from "hooks"

const Top = styled.div`
  display: flex;
  justify-content: space-between;

  align-items: center;
  padding: 0 12px 0 16px;
  border-bottom: 1px solid lightgrey;
  height: 64px;
`
const Body = styled.div`
  img {
    max-width: 100%;
    width: 100%;
    background: lightgrey;
  }
  dd {
    margin: 0px;
    text-align: center;
  }
`

export const RightPanel: FC = () => {
  const { handleClear } = useRightPanel()

  return (
    <>
      <Top>
        <span>Details</span>
        <button onClick={handleClear}>X</button>
      </Top>

      <Body>
        <img src={""} alt="user avatar" />
        <dd></dd>
      </Body>
    </>
  )
}
