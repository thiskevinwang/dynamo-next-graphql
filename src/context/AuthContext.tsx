import { useReducer, useEffect, createContext } from "react"
import * as jwt from "jsonwebtoken"

enum AuthActionTypeEnum {
  Login = "Login",
  Logout = "Logout",
  Error = "Error",
}

type LoginAction = {
  type: AuthActionTypeEnum.Login
  token: string
}
type LogoutAction = {
  type: AuthActionTypeEnum.Logout
}
type ErrorAction = {
  type: AuthActionTypeEnum.Error
  error: any
}
type AuthAction = LoginAction | LogoutAction | ErrorAction

interface AuthState {
  token?: string | null
  error?: any
}
interface AuthContextShape extends AuthState {
  handleLogin(token: string): void
  handleLogout(): void
}

export const AuthContext = createContext<AuthContextShape>({
  token: undefined,
  error: undefined,
  handleLogin: () => {},
  handleLogout: () => {},
})

const authReducer = (state: AuthState, action: AuthAction) => {
  switch (action.type) {
    case AuthActionTypeEnum.Login:
      return { token: action.token }
    case AuthActionTypeEnum.Logout:
      return { token: undefined }
    case AuthActionTypeEnum.Error:
      return { token: undefined, error: action.error }
    default:
      return state
  }
}

export const AuthProvider: React.FC = ({ children }) => {
  const [{ error, token }, dispatchAuthAction] = useReducer(authReducer, {
    token:
      typeof window !== "undefined" ? localStorage.getItem("TOKEN") : undefined,
  })

  const handleLogin = (token: string) =>
    dispatchAuthAction({ type: AuthActionTypeEnum.Login, token })
  const handleLogout = () =>
    dispatchAuthAction({ type: AuthActionTypeEnum.Logout })

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (token) {
        // verify jwt
        try {
          jwt.verify(token, process.env.APP_SECRET as string)
        } catch (err) {
          localStorage.removeItem("TOKEN")
          return dispatchAuthAction({
            type: AuthActionTypeEnum.Error,
            error: err,
          })
        }
        // business as usual
        localStorage.setItem("TOKEN", token)
      } else {
        localStorage.removeItem("TOKEN")
      }
    }
  }, [token])

  return (
    <AuthContext.Provider
      value={{
        token,
        error,
        handleLogin,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
