import React from "react"
import Link from "next/link"
import Head from "next/head"
import { useRouter } from "next/router"
import styled from "styled-components"

interface Props {
  title?: string
}
export const SlackLayout: React.FC<Props> = ({ title, children }) => {
  const router = useRouter()
  return (
    <Styles>
      <header className="header">
        <ul>
          <li>
            <button onClick={router.back}>←</button>
          </li>
          <li>
            <button disabled>→</button>
          </li>
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
              <li>
                <WorkspaceIcon>&nbsp;😀</WorkspaceIcon>
              </li>
              <li>
                <WorkspaceIcon>&nbsp;😊</WorkspaceIcon>
              </li>
              <li>
                <WorkspaceIcon>&nbsp;😇</WorkspaceIcon>
              </li>
              <li>
                <WorkspaceIcon>&nbsp;🤨</WorkspaceIcon>
              </li>
              <li>
                <WorkspaceIcon>&nbsp;🥱</WorkspaceIcon>
              </li>
            </ul>
          </Workspaces>
          <ChannelsContainer>
            <SidebarTop></SidebarTop>
            <Lists>
              <NavList>
                <ul>
                  <li>
                    <Link
                      href={"/channels/[channel_name]"}
                      as={"/channels/all_unreads"}
                    >
                      <a>All Unreads</a>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={"/channels/[channel_name]"}
                      as={"/channels/threads"}
                    >
                      <a>Threads</a>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={"/channels/[channel_name]"}
                      as={"/channels/mentions_and_reactions"}
                    >
                      <a>Mentions & reactions</a>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={"/channels/[channel_name]"}
                      as={"/channels/drafts"}
                    >
                      <a>Drafts</a>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={"/channels/[channel_name]"}
                      as={"/channels/saved_items"}
                    >
                      <a>Saved items</a>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={"/channels/[channel_name]"}
                      as={"/channels/people"}
                    >
                      <a>People</a>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={"/channels/[channel_name]"}
                      as={"/channels/apps"}
                    >
                      <a>Apps</a>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={"/channels/[channel_name]"}
                      as={"/channels/files"}
                    >
                      <a>Files</a>
                    </Link>
                  </li>
                  <li>
                    <Link href={"/"}>
                      <a>Show less</a>
                    </Link>
                  </li>
                </ul>
              </NavList>
              <ChannelList>
                <details>
                  <summary>Channels</summary>
                  <ul>
                    {Array(30)
                      .fill(null)
                      .map((_e, i) => {
                        return (
                          <li key={i}>
                            <Link href={"/"}>
                              <a>Channel {i}</a>
                            </Link>
                          </li>
                        )
                      })}
                  </ul>
                </details>
              </ChannelList>
            </Lists>
          </ChannelsContainer>
        </Sidebar>
        <Content>
          <header>
            <div>
              <h1>{title}</h1>
            </div>
          </header>
          <Head>
            <title>{title}</title>
          </Head>
          <main>{children}</main>
        </Content>
        <RightSidebar>
          <SidebarTop>Test</SidebarTop>
        </RightSidebar>
      </div>
    </Styles>
  )
}
const Sidebar = styled.div`
  display: grid;
  grid-template-columns: 50px auto;
`
const RightSidebar = styled.div`
  border-left: 1px solid lightgrey;
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
      margin-top: 1rem;
    }
  }
`
const WorkspaceIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  line-height: 0.6;
  width: 30px;
  height: 30px;
  border: 1px solid lightgrey;
  border-radius: 5px;
`
const ChannelsContainer = styled.div`
  border-right: 1px solid lightgrey;
`
const SidebarTop = styled.div`
  border-bottom: 1px solid lightgrey;
  height: 64px;
`
const NavList = styled.div`
  border-bottom: 1px solid lightgrey;
  padding-top: 10px;
  padding-bottom: 10px;

  ul {
    display: flex;
    flex-direction: column;

    padding: 0;
    margin: 0;
    list-style: none;
    li {
      padding-left: 1rem;
      height: 28px;
      display: flex;
      align-items: center;
    }
  }
`
const ChannelList = styled.div`
  padding-top: 10px;
  padding-bottom: 10px;
  summary {
    padding-left: 1rem;
  }
  ul {
    display: flex;
    flex-direction: column;

    padding: 0;
    margin: 0;
    list-style: none;
    li {
      padding-left: 1rem;
      height: 28px;
      display: flex;
      align-items: center;
    }
  }
`

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
    grid-template-columns: 220px auto 430px;
  }
`

const Content = styled.div`
  header {
    display: flex;
    height: 64px;
    border-bottom: 1px solid lightgrey;
    div {
      padding: 1rem;
      display: flex;
      align-items: center;
    }
  }
  main {
    padding: 1rem;
    /* content header, layout header, content padding */
    height: calc(100vh - (65px + 38px + 2rem));
    overflow: scroll;
  }
`
const Lists = styled.div`
  /* content header, layout header */
  height: calc(100vh - (65px + 38px));
  overflow: scroll;
`
