import { UserProvider } from "./user"
import { ContactProvider } from "./contact"
import { ReactNode } from "react"

interface ProviderProps {
  children: ReactNode
}

const Provider = ({ children }: ProviderProps) => (
  <UserProvider>
    <ContactProvider>{children}</ContactProvider>
  </UserProvider>
)

export default Provider
