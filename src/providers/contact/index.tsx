import { message } from "antd"
import { createContext, ReactNode, useContext } from "react"

import api from "../../api"

export interface CreateContactData {
  full_name: string
  emails: string[]
  numbers: string[]
}
export interface LoginResponse {
  token: string
  id: string
}
export interface IContact {
  id: string
  full_name: string
  emails: {
    id: string
    email: string
  }[]
  numbers: {
    id: string
    number: string
  }[]
}
export interface UpdateContactData {
  full_name?: string
  emails?: string[]
  numbers?: string[]
}

interface ContactContextProps {
  createContact: (data: CreateContactData) => Promise<any>
  getLoginResponse: () =>
    | {
        token: string
        id: string
      }
    | undefined
  getAllContacts: () => Promise<any>
  updateContact: (contactId: string, data: UpdateContactData) => Promise<any>
  deleteContact: (contactId: string) => Promise<any>
}
interface ContactProviderProps {
  children: ReactNode
}

const ContactContext = createContext<ContactContextProps>(
  {} as ContactContextProps
)

export const ContactProvider = ({ children }: ContactProviderProps) => {
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

  const getLoginResponse = () => {
    const token = window.localStorage.getItem("user@token")
    const id = window.localStorage.getItem("user@id")

    return token && id ? { token, id } : undefined
  }

  const createContact = async (data: CreateContactData) => {
    const loginResponse = getLoginResponse()

    return loginResponse
      ? await api
          .post("/contacts", data, {
            headers: { Authorization: `Bearer ${loginResponse.token}` }
          })
          .then(() => true)
          .catch((err) => displayErrors(err))
      : undefined
  }

  const getAllContacts = async () => {
    const loginResponse = getLoginResponse()

    return loginResponse
      ? await api
          .get(`/contacts`, {
            headers: { Authorization: `Bearer ${loginResponse.token}` }
          })
          .then((res) => res.data)
          .catch((err) => displayErrors(err))
      : undefined
  }

  const updateContact = async (contactId: string, data: UpdateContactData) => {
    const loginResponse = getLoginResponse()

    return loginResponse
      ? await api
          .patch(`/contacts/${contactId}`, data, {
            headers: { Authorization: `Bearer ${loginResponse.token}` }
          })
          .then((res) => res.data)
          .catch((err) => displayErrors(err))
      : undefined
  }

  const deleteContact = async (contactId: string) => {
    const loginResponse = getLoginResponse()

    return loginResponse
      ? await api
          .delete(`/contacts/${contactId}`, {
            headers: { Authorization: `Bearer ${loginResponse.token}` }
          })
          .then(() => {
            return true
          })
          .catch((err) => displayErrors(err))
      : undefined
  }

  return (
    <ContactContext.Provider
      value={{
        createContact,
        getLoginResponse,
        getAllContacts,
        updateContact,
        deleteContact
      }}
    >
      {children}
    </ContactContext.Provider>
  )
}

const UseContactContext = () => useContext(ContactContext)

export default UseContactContext
