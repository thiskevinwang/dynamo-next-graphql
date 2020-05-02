import { createContext, Dispatch } from "react"

export enum AuthActionTypeEnum {
  Login = "Login",
  Logout = "Logout",
}

export interface AuthAction {
  type: AuthActionTypeEnum
  token?: string
}

export interface AuthState {
  token?: string | null
}

export interface AuthContextShape {
  authState: AuthState
  dispatchAuthAction?: Dispatch<AuthAction>
  actionTypes: typeof AuthActionTypeEnum
}

export const AuthContext = createContext<AuthContextShape>({
  authState: { token: undefined },
  dispatchAuthAction: undefined,
  actionTypes: AuthActionTypeEnum,
})
