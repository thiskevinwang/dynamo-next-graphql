import { useReducer, useEffect, createContext } from "react"

enum AuthActionTypeEnum {
  Login = "Login",
  Logout = "Logout",
}

type LoginAction = {
  type: AuthActionTypeEnum.Login
  token: string
}
type LogoutAction = {
  type: AuthActionTypeEnum.Logout
}
type AuthAction = LoginAction | LogoutAction

interface AuthState {
  token?: string | null
}

interface AuthContextShape {
  authState: AuthState
  handleLogin(token: string): void
  handleLogout(): void
}

export const AuthContext = createContext<AuthContextShape>({
  authState: { token: undefined },
  handleLogin: () => {},
  handleLogout: () => {},
})

const authReducer = (state: AuthState, action: AuthAction) => {
  switch (action.type) {
    case AuthActionTypeEnum.Login:
      return { token: action.token }
    case AuthActionTypeEnum.Logout:
      return { token: undefined }
    default:
      return state
  }
}

export const AuthProvider: React.FC = ({ children }) => {
  const [authState, dispatchAuthAction] = useReducer(authReducer, {
    token:
      typeof window !== "undefined" ? localStorage.getItem("TOKEN") : undefined,
  })

  const handleLogin = (token: string) =>
    dispatchAuthAction({ type: AuthActionTypeEnum.Login, token })
  const handleLogout = () =>
    dispatchAuthAction({ type: AuthActionTypeEnum.Logout })

  useEffect(() => {
    if (authState.token) {
      localStorage.setItem("TOKEN", authState.token)
    } else {
      localStorage.removeItem("TOKEN")
    }
  }, [authState.token])

  return (
    <AuthContext.Provider
      value={{
        authState,
        handleLogin,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
