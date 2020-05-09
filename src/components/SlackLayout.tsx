import React, { useRef } from "react"
import Link from "next/link"
import Head from "next/head"
import { useRouter } from "next/router"
import styled, { BaseProps } from "styled-components"

import { useAuth, useRightPanel } from "hooks"
import { RightPanel } from "components/RightPanel"
import { ChannelList } from "components/ChannelList"
import { LinkActive } from "components/LinkActive"
import { LayoutContextProvider } from "context"

interface Props {
  title?: string
}
export const SlackLayout: React.FC<Props> = ({ title, children }) => {
  const router = useRouter()
  const { token, handleLogout } = useAuth()
  const { username } = useRightPanel()

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
      <ContentGrid isRightPanelOpen={!!username}>
        <LeftSidebar>
          <TeamsColumn>
            <ul>
              <li>
                <TeamIcon>&nbsp;😀</TeamIcon>
              </li>
              <li>
                <TeamIcon>&nbsp;😊</TeamIcon>
              </li>
              <li>
                <TeamIcon>&nbsp;😇</TeamIcon>
              </li>
              <li>
                <TeamIcon>&nbsp;🤨</TeamIcon>
              </li>
              <li>
                <TeamIcon>&nbsp;🥱</TeamIcon>
              </li>
            </ul>
          </TeamsColumn>
          <ChannelsContainer>
            <SidebarTop></SidebarTop>
            <Lists>
              <NavList>
                <ul>
                  <LinkActive
                    href={"/channels/[channelName]"}
                    as={"/channels/all_unreads"}
                  >
                    All Unreads
                  </LinkActive>
                  <LinkActive
                    href={"/channels/[channelName]"}
                    as={"/channels/threads"}
                  >
                    Threads
                  </LinkActive>
                  <LinkActive
                    href={"/channels/[channelName]"}
                    as={"/channels/mentions_and_reactions"}
                  >
                    Mentions & reactions
                  </LinkActive>
                  <LinkActive
                    href={"/channels/[channelName]"}
                    as={"/channels/drafts"}
                  >
                    Drafts
                  </LinkActive>
                  <LinkActive
                    href={"/channels/[channelName]"}
                    as={"/channels/saved_items"}
                  >
                    Saved items
                  </LinkActive>
                  <LinkActive
                    href={"/channels/[channelName]"}
                    as={"/channels/people"}
                  >
                    People
                  </LinkActive>
                  <LinkActive
                    href={"/channels/[channelName]"}
                    as={"/channels/apps"}
                  >
                    Apps
                  </LinkActive>
                  <LinkActive
                    href={"/channels/[channelName]"}
                    as={"/channels/files"}
                  >
                    Files
                  </LinkActive>
                  <LinkActive href={"/"} as={"/"}>
                    Show less
                  </LinkActive>
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
          <RightPanel />
        </RightSidebar>
      </ContentGrid>
    </Styles>
  )
}
const LeftSidebar = styled.div`
  background: ${(p: BaseProps) => p.theme.backgroundSidebar};
  color: ${(p: BaseProps) => p.theme.textSecondary};
  a {
    /* color: ${(p: BaseProps) => p.theme.textSecondary}; */
  }

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
  border-left: 1px solid ${(p: BaseProps) => p.theme.muted};
`

const TeamsColumn = styled.div`
  border-right: 1px solid ${(p: BaseProps) => p.theme.borderSidebar};
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
const TeamIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  line-height: 0.6;
  width: 30px;
  height: 30px;
  border: 1px solid ${(p: BaseProps) => p.theme.borderSidebar};
  border-radius: 5px;
`
const ChannelsContainer = styled.div`
  border-right: 1px solid ${(p: BaseProps) => p.theme.borderSidebar};
`
const SidebarTop = styled.div`
  background: ${(p: BaseProps) => p.theme.backgroundSidebar};
  border-bottom: 1px solid ${(p: BaseProps) => p.theme.borderSidebar};
  height: 64px;
`
const NavList = styled.div`
  border-bottom: 1px solid ${(p: BaseProps) => p.theme.borderSidebar};
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
    /* theme */
    background: ${(p: BaseProps) => p.theme.topNav};
    a {
      color: ${(p: BaseProps) => p.theme.textSecondary};
    }
    /* theme */

    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid ${(p: BaseProps) => p.theme.borderSidebar};

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

const LEFT = 250
const RIGHT_SM = 280
const RIGHT_MD = 350
const RIGHT_LG = 400
const RIGHT_XL = 430

const ContentGrid = styled.div<{ isRightPanelOpen: boolean }>`
  display: grid;
  overflow: hidden;
  grid-template-columns: 0px minmax(auto, 100vw) 0px;
  /* animated grid only supported by Firefox - 2020-05-02 */
  transition: grid-template-columns 200ms ease-in-out;

  @media (min-width: 600px) {
    overflow: unset;
    grid-template-columns:
      ${LEFT}px minmax(
        100px,
        calc(
          100vw - ${LEFT}px -
            ${(props) => (props.isRightPanelOpen ? RIGHT_SM : 0)}px
        )
      )
      ${(props) => (props.isRightPanelOpen ? RIGHT_SM : 0)}px;
  }
  @media (min-width: 960px) {
    grid-template-columns:
      ${LEFT}px minmax(
        100px,
        calc(
          100vw - ${LEFT}px -
            ${(props) => (props.isRightPanelOpen ? RIGHT_MD : 0)}px
        )
      )
      ${(props) => (props.isRightPanelOpen ? RIGHT_MD : 0)}px;
  }
  @media (min-width: 1280px) {
    grid-template-columns:
      ${LEFT}px minmax(
        100px,
        calc(
          100vw - ${LEFT}px -
            ${(props) => (props.isRightPanelOpen ? RIGHT_LG : 0)}px
        )
      )
      ${(props) => (props.isRightPanelOpen ? RIGHT_LG : 0)}px;
  }
  @media (min-width: 1920px) {
    grid-template-columns:
      ${LEFT}px minmax(
        100px,
        calc(
          100vw - ${LEFT}px -
            ${(props) => (props.isRightPanelOpen ? RIGHT_XL : 0)}px
        )
      )
      ${(props) => (props.isRightPanelOpen ? RIGHT_XL : 0)}px;
  }
`

const Content = styled.div`
  position: relative;
  > header {
    display: flex;
    height: 64px;
    border-bottom: 1px solid ${(p: BaseProps) => p.theme.muted};
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
