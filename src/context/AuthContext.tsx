import { useReducer, useEffect, createContext } from "react"
import * as jwt from "jsonwebtoken"

enum AuthActionTypeEnum {
  Login = "Login",
  Logout = "Logout",
  Verify = "Verify",
  Error = "Error",
}

type LoginAction = {
  type: AuthActionTypeEnum.Login
  token: string
}
type LogoutAction = {
  type: AuthActionTypeEnum.Logout
}
type VerifyAction = {
  type: AuthActionTypeEnum.Verify
  email: string
  username: string
}
type ErrorAction = {
  type: AuthActionTypeEnum.Error
  error: any
}
type AuthAction = LoginAction | LogoutAction | ErrorAction | VerifyAction

interface AuthState {
  email?: string
  username?: string
  token?: string | null
  error?: any
}

type TokenPayload = {
  email: string
  username: string
}

interface AuthContextShape extends AuthState {
  email?: string
  username?: string
  handleLogin(token: string): void
  handleLogout(): void
}

export const AuthContext = createContext<AuthContextShape>({
  username: undefined,
  email: undefined,
  token: undefined,
  error: undefined,
  handleLogin: () => {},
  handleLogout: () => {},
})

const authReducer = (state: AuthState, action: AuthAction) => {
  switch (action.type) {
    case AuthActionTypeEnum.Login:
      return { token: action.token }
    case AuthActionTypeEnum.Verify:
      return {
        email: action.email,
        username: action.username,
        ...state,
      }
    case AuthActionTypeEnum.Logout:
      return { token: undefined }
    case AuthActionTypeEnum.Error:
      return { token: undefined, error: action.error }
    default:
      return state
  }
}

export const AuthProvider: React.FC = ({ children }) => {
  const [{ error, token, email, username }, dispatchAuthAction] = useReducer(
    authReducer,
    {
      token:
        typeof window !== "undefined"
          ? localStorage.getItem("TOKEN")
          : undefined,
    }
  )

  const handleLogin = (token: string) =>
    dispatchAuthAction({ type: AuthActionTypeEnum.Login, token })
  const handleLogout = () =>
    dispatchAuthAction({ type: AuthActionTypeEnum.Logout })

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (token) {
        // verify jwt
        try {
          const { email, username } = jwt.verify(
            token,
            process.env.APP_SECRET as string
          ) as TokenPayload

          dispatchAuthAction({
            type: AuthActionTypeEnum.Verify,
            email,
            username,
          })
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
        email,
        username,
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
