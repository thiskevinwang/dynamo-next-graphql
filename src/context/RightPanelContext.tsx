import { useEffect, useReducer, createContext } from "react"

import { useAuth } from "hooks"

enum RightPanelActionTypeEnum {
  SET = "SET",
  CLEAR = "CLEAR",
}

type SetAction = {
  type: RightPanelActionTypeEnum.SET
  username: string
}
type ClearAction = {
  type: RightPanelActionTypeEnum.CLEAR
}
type RightPanelAction = SetAction | ClearAction

interface RightPanelState {
  username?: string
}

interface RightPanelContextShape extends RightPanelState {
  handleSet(username: string): void
  handleClear(): void
}

export const RightPanelContext = createContext<RightPanelContextShape>({
  username: undefined,
  handleSet: () => {},
  handleClear: () => {},
})

const rightPanelReducer = (
  state: RightPanelState,
  action: RightPanelAction
) => {
  switch (action.type) {
    case RightPanelActionTypeEnum.SET:
      return { username: action.username }
    case RightPanelActionTypeEnum.CLEAR:
      return { username: undefined }
    default:
      return state
  }
}

export const RightPanelProvider: React.FC = ({ children }) => {
  const { username: authUsername } = useAuth()

  const [{ username }, dispatchRightPanelAction] = useReducer(
    rightPanelReducer,
    { username: authUsername }
  )

  const handleSet = (username: string) =>
    dispatchRightPanelAction({ type: RightPanelActionTypeEnum.SET, username })
  const handleClear = () =>
    dispatchRightPanelAction({ type: RightPanelActionTypeEnum.CLEAR })

  useEffect(() => {
    if (authUsername) {
      dispatchRightPanelAction({
        type: RightPanelActionTypeEnum.SET,
        username: authUsername,
      })
    } else {
      dispatchRightPanelAction({ type: RightPanelActionTypeEnum.CLEAR })
    }
  }, [authUsername])

  return (
    <RightPanelContext.Provider
      value={{
        username,
        handleSet,
        handleClear,
      }}
    >
      {children}
    </RightPanelContext.Provider>
  )
}
