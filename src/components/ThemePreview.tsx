import styled, { ThemeProvider, BaseProps } from "styled-components"

import { theme, Mode } from "theme"
import { useColorScheme } from "hooks"

const Presenter = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
`

interface BoxProps {
  active: boolean
}
const Box = styled.div`
  outline-width: ${(p: BaseProps & BoxProps) => p.active && `3px`};
  outline-style: ${(p: BaseProps & BoxProps) => p.active && `solid`};
  outline-color: ${(p: BaseProps & BoxProps) => p.active && p.theme.muted};

  box-shadow: 0 1px 0 ${(p: BaseProps) => p.theme.backgroundHover};
  display: flex;
  flex-direction: column;
  position: relative;
  border-radius: 5px;
  /* clip border-radius */
  overflow: hidden;

  width: calc(50% - 20pt);
  min-width: 375px;
  min-height: 200px;

  margin: 10pt;

  color: ${(p: BaseProps) => p.theme.text};

  transition: all 100ms ease-in-out;

  p {
    margin: 0;
    margin-bottom: 0.5rem;
    height: 1rem;
    border-radius: 5px;
    width: 75%;

    &.text {
      color: ${(p: BaseProps) => p.theme.text};
      background: ${(p: BaseProps) => p.theme.text};
    }
    &.textTime {
      color: ${(p: BaseProps) => p.theme.textTime};
      background: ${(p: BaseProps) => p.theme.textTime};
    }
    &.textEdited {
      color: ${(p: BaseProps) => p.theme.textEdited};
      background: ${(p: BaseProps) => p.theme.textEdited};
    }
    &.textSecondary {
      color: ${(p: BaseProps) => p.theme.textSecondary};
      background: ${(p: BaseProps) => p.theme.textSecondary};
    }
    &.textSecondaryActive {
      color: ${(p: BaseProps) => p.theme.textSecondaryActive};
      background: ${(p: BaseProps) => p.theme.textSecondaryActive};
    }
    &.textSecondaryActiveSelected {
      color: ${(p: BaseProps) => p.theme.textSecondaryActiveSelected};
      background: ${(p: BaseProps) => p.theme.textSecondaryActiveSelected};
    }
    &.muted {
      color: ${(p: BaseProps) => p.theme.muted};
      background: ${(p: BaseProps) => p.theme.muted};
    }
  }
  .statusActive {
    color: ${(p: BaseProps) => p.theme.statusActive};
    background: ${(p: BaseProps) => p.theme.statusActive};
  }

  header {
    &.topNav {
      height: 10pt;
      padding: 5pt;
      background: ${(p: BaseProps) => p.theme.topNav};
      border-bottom: 1px solid ${(p: BaseProps) => p.theme.borderSidebar};
    }
  }
  div {
    &.background {
      padding: 5pt;
      display: flex;

      width: 80%;
      height: 100%;
      background: ${(p: BaseProps) => p.theme.background};

      :hover {
        background: ${(p: BaseProps) => p.theme.backgroundHover};
      }
    }

    &.backgroundSidebar {
      padding: 5pt;
      display: flex;

      border-right-color: ${(p: BaseProps) => p.theme.borderSidebar};
      border-right-style: solid;
      border-right-width: 1px;

      width: 20%;
      height: 100%;
      background: ${(p: BaseProps) => p.theme.backgroundSidebar};

      :hover {
        background: ${(p: BaseProps) => p.theme.backgroundSidebarHover};
      }
    }
  }
`

export const ThemePreview = () => {
  const { mode: activeMode, setColorContext } = useColorScheme()
  return (
    <Presenter>
      {Object.entries(Mode).map(([name, mode]) => {
        const isActive = activeMode === mode

        return (
          <ThemeProvider theme={{ mode, ...theme }} key={name}>
            <Box active={isActive} onClick={() => setColorContext(mode)}>
              <header
                style={{ flexDirection: "row", display: "flex" }}
                className="topNav"
              >
                <p
                  className="statusActive"
                  style={{ height: 10, width: 10, borderRadius: `100%` }}
                ></p>
              </header>

              <div style={{ flexDirection: "row", display: "flex", flex: 1 }}>
                <div
                  style={{ flexDirection: "column", display: "flex" }}
                  className="backgroundSidebar"
                >
                  <p className="textSecondary"></p>
                  <p className="textSecondaryActive"></p>
                  <p className="textSecondaryActiveSelected"></p>
                  <p className="muted"></p>
                </div>
                <div
                  style={{ flexDirection: "column", display: "flex" }}
                  className="background"
                >
                  <p className="text"></p>
                  <p className="textTime"></p>
                  <p className="textEdited"></p>
                </div>
              </div>
            </Box>
          </ThemeProvider>
        )
      })}
    </Presenter>
  )
}
