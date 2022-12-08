import { message } from "antd"
import { createContext, ReactNode, useContext, useState } from "react"

import api from "../../api"

export interface CreateUserData {
  full_name: string
  password: string
  emails: string[]
  numbers: string[]
}
export interface LoginUserData {
  full_name: string
  password: string
}
export interface LoginResponse {
  token: string
  id: string
}
export interface IUser {
  id: string
  full_name: string
  created_at: string
  emails: {
    id: string
    email: string
  }[]
  numbers: {
    id: string
    number: string
  }[]
}
export interface UpdateUserData {
  full_name?: string
  password?: string
  emails?: string[]
  numbers?: string[]
}

interface UserContextProps {
  createUser: (data: CreateUserData) => Promise<boolean | undefined>
  login: (data: LoginUserData) => Promise<boolean | undefined>
  getLoginResponse: () =>
    | {
        token: string
        id: string
      }
    | undefined
  getUserInfos: () => Promise<any>
  updateUser: (data: UpdateUserData) => Promise<any>
  deleteUser: () => Promise<undefined>
}
interface UserProviderProps {
  children: ReactNode
}

const UserContext = createContext<UserContextProps>({} as UserContextProps)

export const UserProvider = ({ children }: UserProviderProps) => {
  const displayErrors = (err: any) => {
    message.error(
      `${
        err?.response?.data?.message
          ? err.response.data?.message
          : "check if the server is running"
      }`,
      2
    )

    return undefined
  }

  const createUser = async (data: CreateUserData) => {
    return await api
      .post("/users", data)
      .then(() => true)
      .catch((err) => displayErrors(err))
  }

  const saveLoginResponse = (loginResponse: LoginResponse) => {
    window.localStorage.setItem("user@token", loginResponse.token)
    window.localStorage.setItem("user@id", loginResponse.id)
  }

  const login = async (data: LoginUserData) => {
    return await api
      .post("/login", data)
      .then((res) => {
        saveLoginResponse(res.data)
        return true
      })
      .catch((err) => displayErrors(err))
  }

  const getLoginResponse = () => {
    const token = window.localStorage.getItem("user@token")
    const id = window.localStorage.getItem("user@id")

    return token && id ? { token, id } : undefined
  }

  const getUserInfos = async () => {
    const loginResponse = getLoginResponse()

    return loginResponse
      ? await api
          .get(`/users/${loginResponse.id}`, {
            headers: { Authorization: `Bearer ${loginResponse.token}` }
          })
          .then((res) => res.data)
          .catch((err) => {
            return displayErrors(err)
          })
      : undefined
  }

  const updateUser = async (data: UpdateUserData) => {
    const loginResponse = getLoginResponse()

    return loginResponse
      ? await api
          .patch(`/users/${loginResponse.id}`, data, {
            headers: { Authorization: `Bearer ${loginResponse.token}` }
          })
          .then((res) => res.data)
          .catch((err) => {
            console.log(err)
            return undefined
          })
      : undefined
  }

  const deleteUser = async () => {
    const loginResponse = getLoginResponse()

    loginResponse &&
      (await api
        .delete(`/users/${loginResponse.id}`, {
          headers: { Authorization: `Bearer ${loginResponse.token}` }
        })
        .then(() => {
          window.localStorage.clear()
        })
        .catch((err) => console.log(err)))
    return undefined
  }

  return (
    <UserContext.Provider
      value={{
        createUser,
        login,
        getLoginResponse,
        getUserInfos,
        updateUser,
        deleteUser
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

const UseUserContext = () => useContext(UserContext)

export default UseUserContext
