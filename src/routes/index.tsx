import { Routes, Route, Navigate } from "react-router-dom"
import UseUserContext from "../providers/user"
import Registration from "../pages/Registration"
import Login from "../pages/Login"
import Profile from "../pages/Profile"

interface PrivateRouteProps {
  targetRoute: JSX.Element
}

const Router = () => {
  const { getLoginResponse } = UseUserContext()

  const PrivateRoute = ({ targetRoute }: PrivateRouteProps) => {
    const loginResponse = getLoginResponse()

    return loginResponse ? targetRoute : <Navigate to="/login" />
  }

  return (
    <Routes>
      <Route path="/" element={<Registration />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/profile"
        element={<PrivateRoute targetRoute={<Profile />} />}
      />
    </Routes>
  )
}

export default Router
