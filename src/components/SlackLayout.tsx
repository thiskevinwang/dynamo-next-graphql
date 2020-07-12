import React, { useRef } from "react"
import Head from "next/head"
import { useRouter } from "next/router"
import styled, { css, BaseProps } from "styled-components"

import { useRightPanel, useTeams } from "hooks"
import { ChannelList } from "components/ChannelList"
import { LinkActive } from "components/LinkActive"
import { LayoutContextProvider } from "context"

interface Props {
  title?: string
}
export const SlackLayout: React.FC<Props> = ({ title, children }) => {
  const router = useRouter()
  const { username: rightPanelUsername } = useRightPanel()
  const { teamName, availableTeams, handleSetTeam } = useTeams()
  const mainRef = useRef<HTMLElement>(null)
  return (
    <Styles>
      <header className="header"></header>
      <ContentGrid isRightPanelOpen={!!rightPanelUsername}>
        <LeftSidebar>
          <TeamsColumn>
            <ul>
              {availableTeams?.map((_teamName) => {
                const handleTeamSelect = () => {
                  router.replace("/")
                  handleSetTeam(_teamName)
                }
                const isActiveTeam = teamName === _teamName
                return (
                  <li key={_teamName} onClick={handleTeamSelect}>
                    <TeamIcon isActive={isActiveTeam}>
                      {_teamName.slice(0, 1).toUpperCase()}
                    </TeamIcon>
                  </li>
                )
              })}
            </ul>
          </TeamsColumn>
          <ChannelsContainer>
            <LeftSidebarTop>
              <h3>{teamName}</h3>
            </LeftSidebarTop>
            <Lists>
              <NavList>
                <ul>
                  <LinkActive href={``} as={``}>
                    All Unreads
                  </LinkActive>
                  <LinkActive href={``} as={``}>
                    Threads
                  </LinkActive>
                  <LinkActive href={``} as={``}>
                    Mentions & reactions
                  </LinkActive>
                  <LinkActive href={``} as={``}>
                    Drafts
                  </LinkActive>
                  <LinkActive href={``} as={``}>
                    Saved items
                  </LinkActive>
                  <LinkActive href={``} as={``}>
                    People
                  </LinkActive>
                  <LinkActive href={``} as={``}>
                    Apps
                  </LinkActive>
                  <LinkActive href={``} as={``}>
                    Files
                  </LinkActive>
                  <LinkActive href={``} as={``}>
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

type TeamIconProps = { isActive?: boolean }
const TeamIcon = styled.div<TeamIconProps>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  line-height: 0.6;
  font-weight: 700;
  width: 30px;
  height: 30px;
  user-select: none;
  cursor: pointer;

  /**
   * border that doesn't affect width:
   * - use outline or psuedo-element
   * @see https://stackoverflow.com/a/11426967/9823455
   */
  :after {
    content: "";
    display: block;
    position: absolute;
    top: 0px;
    bottom: 0px;
    left: 0px;
    right: 0px;

    border-color: ${(p: BaseProps) => p.theme.borderSidebar};
    border-width: 1px;
    border-style: solid;
    border-radius: 5px;

    transition: all 100ms ease-in-out;

    ${(p: BaseProps & TeamIconProps) =>
      p.isActive &&
      css`
        border-width: 3px;
        top: -3px;
        bottom: -3px;
        left: -3px;
        right: -3px;
        border-color: ${(p: BaseProps) => p.theme.textSecondaryActiveSelected};
      `};
  }
  :hover:after {
    border-width: 3px;
    top: -3px;
    bottom: -3px;
    left: -3px;
    right: -3px;
  }
`
const ChannelsContainer = styled.div`
  border-right: 1px solid ${(p: BaseProps) => p.theme.borderSidebar};
`
const LeftSidebarTop = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 1rem;
  h3 {
    margin: 0;
  }
  p {
    margin: 0;
    font-size: 13px;

    /* TODO placeholder status-dot */
    :before {
      content: "";
      display: inline-block;
      margin: 0 4px 0 -1px;
      border-radius: 100%;
      width: 9px;
      height: 9px;
      background: ${(p: BaseProps) => p.theme.statusActive};
    }
  }

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
