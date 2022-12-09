import { StyledCard, FlexContainer } from "./style"
import { Typography, List, message } from "antd"
import UseUserContext, { IUser } from "../../providers/user"
import Modal from "../Modal"

import { useState } from "react"
import { useNavigate } from "react-router-dom"

interface UserForUpdate {
  full_name: string
  emails: string[]
  numbers: string[]
}

const UserCard = ({
  user,
  setUser,
  setIsLoading
}: {
  user: IUser
  setUser: React.Dispatch<React.SetStateAction<IUser | undefined>>
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const [userModal, setUserModal] = useState<boolean>(false)
  const [userForUpdate, setUserForUpdate] = useState<UserForUpdate>({
    full_name: user.full_name,
    emails: user.emails.map((item) => item.email),
    numbers: user.numbers.map((item) => item.number)
  })
  const { updateUser, deleteUser } = UseUserContext()
  const navigate = useNavigate()

  const sendUpdate = () => {
    updateUser(userForUpdate).then((res) => {
      setUser(res)
      res && message.success("User updated!", 2)
    })
    setUserModal(false)
  }

  const sendDelete = () => {
    setUserModal(false)
    setIsLoading(true)
    deleteUser().then((res) => {
      setUser(undefined)
      setIsLoading(false)
      if (res) {
        message.success("User has been deleted", 2)
        setTimeout(() => {
          navigate("/login")
        }, 2000)
      }
    })
  }

  return (
    <>
      <StyledCard onClick={() => setUserModal(true)}>
        <div className="Card__head">
          <span className="Card__head__span">{user.full_name}</span>
        </div>
        <div className="Card__body">
          <Typography.Paragraph>{`${new Date(
            user?.created_at?.slice(0, -1)
          ).toDateString()}`}</Typography.Paragraph>

          <FlexContainer>
            <List
              size="small"
              header={"Emails"}
              dataSource={user.emails}
              itemLayout="horizontal"
              bordered
              renderItem={(item) => <List.Item>{item.email}</List.Item>}
              style={{
                height: "fit-content"
              }}
            />
            <List
              size="small"
              header={"Numbers"}
              dataSource={user.numbers}
              itemLayout="horizontal"
              bordered
              renderItem={(item) => <List.Item>{item.number}</List.Item>}
              style={{
                height: "fit-content"
              }}
            />
          </FlexContainer>
        </div>
      </StyledCard>
      {userModal && (
        <Modal
          mainObject={userForUpdate}
          setMainObject={setUserForUpdate}
          setOpen={setUserModal}
          onSave={sendUpdate}
          onDelete={sendDelete}
        />
      )}
    </>
  )
}

export default UserCard
