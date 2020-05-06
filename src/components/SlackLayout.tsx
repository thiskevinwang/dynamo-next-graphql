import React, { useRef } from "react"
import Link from "next/link"
import Head from "next/head"
import { useRouter } from "next/router"
import styled from "styled-components"

import { useAuth } from "hooks"
import { RightPanel } from "components/RightPanel"
import { ChannelList } from "components/ChannelList"
import { LayoutContextProvider } from "context"

interface Props {
  title?: string
}
export const SlackLayout: React.FC<Props> = ({ title, children }) => {
  const router = useRouter()
  const { email, username, token, handleLogout } = useAuth()

  const mainRef = useRef<HTMLElement>(null)
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
          {/*<li>
            <Link href={"/create"}>
              <a>Create</a>
            </Link>
          </li>*/}
          {!token ? (
            <>
              <li>
                <Link href={"/auth/signup"}>
                  <a>Signup</a>
                </Link>
              </li>
              <li>
                <Link href={"/auth/login"}>
                  <a>Login</a>
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link href={"/profile"}>
                  <a>Profile</a>
                </Link>
              </li>
              <li>
                <Link href={"/auth/logout"}>
                  <a onClick={handleLogout}>Logout</a>
                </Link>
              </li>
            </>
          )}
        </ul>
      </header>
      <ContentGrid>
        <LeftSidebar>
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
                      href={"/channels/[channelName]"}
                      as={"/channels/all_unreads"}
                    >
                      <a>All Unreads</a>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={"/channels/[channelName]"}
                      as={"/channels/threads"}
                    >
                      <a>Threads</a>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={"/channels/[channelName]"}
                      as={"/channels/mentions_and_reactions"}
                    >
                      <a>Mentions & reactions</a>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={"/channels/[channelName]"}
                      as={"/channels/drafts"}
                    >
                      <a>Drafts</a>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={"/channels/[channelName]"}
                      as={"/channels/saved_items"}
                    >
                      <a>Saved items</a>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={"/channels/[channelName]"}
                      as={"/channels/people"}
                    >
                      <a>People</a>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={"/channels/[channelName]"}
                      as={"/channels/apps"}
                    >
                      <a>Apps</a>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={"/channels/[channelName]"}
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

              <ChannelList />
            </Lists>
          </ChannelsContainer>
        </LeftSidebar>

        <Content>
          <header>
            <div>
              <h1>{title}</h1>
            </div>
          </header>
          <Head>
            <title>{title}</title>
          </Head>
          <LayoutContextProvider mainRef={mainRef}>
            <main ref={mainRef}>{children}</main>
          </LayoutContextProvider>
        </Content>

        <RightSidebar>
          {email && username && (
            <RightPanel email={email} username={username} />
          )}
        </RightSidebar>
      </ContentGrid>
    </Styles>
  )
}
const LeftSidebar = styled.div`
  display: grid;
  grid-template-columns: 0px 0px;
  overflow: hidden;
  @media (min-width: 600px) {
    grid-template-columns: 50px auto;
  }
  @media (min-width: 960px) {
    grid-template-columns: 50px auto;
  }
  @media (min-width: 1280px) {
    grid-template-columns: 50px auto;
  }
  @media (min-width: 1920px) {
    grid-template-columns: 50px auto;
  }
`
const RightSidebar = styled.aside`
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

const Styles = styled.div`
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-rows: 38px auto min-content;

  .header {
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid lightgrey;

    ul {
      padding: 0;
      margin: 0;
      list-style: none;
      li {
        margin-left: 1rem;
        /* margin-right: 1rem; */
        float: left;
      }
    }
  }
`

const LEFT = 220
const RIGHT_SM = 280
const RIGHT_MD = 350
const RIGHT_LG = 400
const RIGHT_XL = 430

const ContentGrid = styled.div`
  display: grid;
  overflow: hidden;
  grid-template-columns: 0px minmax(auto, 100vw) 0px;
  /* animated grid only supported by Firefox - 2020-05-02 */
  transition: grid-template-columns 200ms ease-in-out;

  @media (min-width: 600px) {
    overflow: unset;
    grid-template-columns:
      ${LEFT}px minmax(100px, calc(100vw - ${LEFT}px - ${RIGHT_SM}px))
      ${RIGHT_SM}px;
  }
  @media (min-width: 960px) {
    grid-template-columns:
      ${LEFT}px minmax(100px, calc(100vw - ${LEFT}px - ${RIGHT_MD}px))
      ${RIGHT_MD}px;
  }
  @media (min-width: 1280px) {
    grid-template-columns:
      ${LEFT}px minmax(100px, calc(100vw - ${LEFT}px - ${RIGHT_MD}px))
      ${RIGHT_LG}px;
  }
  @media (min-width: 1920px) {
    grid-template-columns:
      ${LEFT}px minmax(100px, calc(100vw - ${LEFT}px - ${RIGHT_MD}px))
      ${RIGHT_XL}px;
  }
`

const Content = styled.div`
  position: relative;
  > header {
    display: flex;
    height: 64px;
    border-bottom: 1px solid lightgrey;
    overflow: hidden;

    div {
      padding: 1rem;
      display: flex;
      align-items: center;
    }
  }
  > main {
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
