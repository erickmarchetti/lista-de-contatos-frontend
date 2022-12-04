import { UserProvider } from "./user"
import { ReactNode } from "react"

interface ProviderProps {
  children: ReactNode
}

const Provider = ({ children }: ProviderProps) => (
  <UserProvider>{children}</UserProvider>
)

export default Provider
