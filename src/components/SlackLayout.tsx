import * as React from "react"
import Link from "next/link"
import styled from "styled-components"

export const SlackLayout: React.FC = ({ children }) => {
  return (
    <Styles>
      <header className="header">
        <ul>
          <li>
            <Link href={"/"}>
              <a>Home</a>
            </Link>
          </li>
          <li>
            <Link href={"/create"}>
              <a>Create</a>
            </Link>
          </li>
        </ul>
      </header>
      <div className="grid">
        <Sidebar>
          <Workspaces>
            <ul>
              <li>😀</li>
              <li>😊</li>
              <li>😇</li>
              <li>🤨</li>
              <li>😫</li>
              <li>🥱</li>
            </ul>
          </Workspaces>
          <ChannelsContainer>
            <User></User>
            <ChannelList></ChannelList>
          </ChannelsContainer>
        </Sidebar>
        <Content>{children}</Content>
      </div>
    </Styles>
  )
}
const Sidebar = styled.div`
  display: grid;
  grid-template-columns: 38px auto;
`

const Workspaces = styled.div`
  border-right: 1px solid lightgrey;
  ul {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0;
    margin: 0;
    list-style: none;
    li {
    }
  }
`
const ChannelsContainer = styled.div`
  border-right: 1px solid lightgrey;
`
const User = styled.div`
  border-bottom: 1px solid lightgrey;
  height: 64px;
`
const ChannelList = styled.div``

const Styles = styled.div`
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-rows: 38px auto min-content;
  grid-template-areas:
    "header__nav"
    "workspace"
    "what_goes_here";
  grid-template-areas: "p-client__workspace";

  .header {
    grid-area: "header__nav";
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid lightgrey;

    ul {
      margin: 0;
      list-style: none;
      li {
        margin-left: 1rem;
        /* margin-right: 1rem; */
        float: left;
      }
    }
  }

  .grid {
    display: grid;
    /* grid-area: "workspace"; */
    grid-template-columns: 220px auto;
  }
`

const Content = styled.main`
  padding-left: 1rem;
  padding-right: 1rem;
`
