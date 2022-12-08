import { StyledCard, FlexContainer, FlexContainerModal, Modal } from "./style"
import { Typography, List, Button, Form, Input, Space, message } from "antd"
import { CloseOutlined, PlusOutlined } from "@ant-design/icons"
import UseUserContext, { IUser } from "../../providers/user"

import { useState } from "react"
import { v4 as uuid } from "uuid"
import { useNavigate } from "react-router-dom"

const UserCard = ({
  user,
  setUser,
  setIsLoading
}: {
  user: IUser
  setUser: React.Dispatch<React.SetStateAction<IUser | undefined>>
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const [open, setOpen] = useState<boolean>(false)
  const [userForUpdate, setUserForUpdate] = useState<IUser>({ ...user })
  const { updateUser, deleteUser } = UseUserContext()
  const navigate = useNavigate()

  const addName = (data: { full_name: string }) => {
    data.full_name &&
      setUserForUpdate({
        ...userForUpdate,
        full_name: data.full_name
      })
  }

  const addEmail = (data: { email: string }) => {
    data.email &&
      setUserForUpdate({
        ...userForUpdate,
        emails: [{ id: uuid(), email: data.email }, ...userForUpdate.emails]
      })
  }

  const addNumber = (data: { number: string }) => {
    data.number &&
      setUserForUpdate({
        ...userForUpdate,
        numbers: [{ id: uuid(), number: data.number }, ...userForUpdate.numbers]
      })
  }

  const deleteFromList = (
    list: { id: string; email: string }[] | { id: string; number: string }[],
    index: number
  ) => {
    list.splice(index, 1)
    setUserForUpdate({ ...userForUpdate })
  }

  const sendUpdate = () => {
    const emails = userForUpdate.emails.map((item) => item.email)
    const numbers = userForUpdate.numbers.map((item) => item.number)
    const formatedUser = { ...userForUpdate, emails, numbers }
    updateUser(formatedUser).then((res) => {
      setUser(res)
      res && message.success("User updated!", 2)
    })
  }

  const sendDelete = () => {
    setOpen(false)
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
      <StyledCard onClick={() => setOpen(true)}>
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
      {open && (
        <Modal>
          <div className="Modal__body">
            <Button
              onClick={() => setOpen(false)}
              style={{
                width: "fit-content",
                height: "fit-content",
                border: 0,
                padding: 0,
                lineHeight: 0,
                position: "absolute",
                top: 7,
                right: 7
              }}
            >
              <CloseOutlined />
            </Button>

            <Typography.Paragraph strong>
              Current name: {userForUpdate.full_name}
            </Typography.Paragraph>

            <Form onFinish={(data) => addName(data)}>
              <Form.Item
                name="full_name"
                rules={[
                  {
                    max: 50,
                    message: "Name must be less than or equal to 50"
                  }
                ]}
                style={{
                  marginBottom: "10px"
                }}
              >
                <Input
                  placeholder="Enter your new name"
                  addonAfter={
                    <Button
                      htmlType="submit"
                      style={{
                        width: "fit-content",
                        height: "fit-content",
                        border: 0,
                        padding: 0,
                        backgroundColor: "transparent"
                      }}
                    >
                      <PlusOutlined />
                    </Button>
                  }
                />
              </Form.Item>
            </Form>

            <Form onFinish={(data) => addEmail(data)}>
              <Form.Item
                name="email"
                rules={[
                  {
                    type: "email",
                    message: "Email must be a valid email"
                  },
                  {
                    max: 40,
                    message: "Email must be less than or equal to 40"
                  }
                ]}
                style={{
                  marginBottom: "10px"
                }}
              >
                <Input
                  placeholder="Enter your new email"
                  addonAfter={
                    <Button
                      htmlType="submit"
                      style={{
                        width: "fit-content",
                        height: "fit-content",
                        border: 0,
                        padding: 0,
                        backgroundColor: "transparent"
                      }}
                    >
                      <PlusOutlined />
                    </Button>
                  }
                />
              </Form.Item>
            </Form>

            <Form onFinish={(data) => addNumber(data)}>
              <Form.Item
                name="number"
                rules={[
                  {
                    pattern: /^[0-9]+$/,
                    message: "Number must be a number"
                  },
                  {
                    min: 9,
                    message: "NUmber must be greater than or equal to 9"
                  },
                  {
                    max: 13,
                    message: "Number must be less than or equal to 13"
                  }
                ]}
                style={{
                  marginBottom: "10px"
                }}
              >
                <Input
                  placeholder="Enter your new number"
                  addonAfter={
                    <Button
                      htmlType="submit"
                      style={{
                        width: "fit-content",
                        height: "fit-content",
                        border: 0,
                        padding: 0,
                        backgroundColor: "transparent"
                      }}
                    >
                      <PlusOutlined />
                    </Button>
                  }
                />
              </Form.Item>
            </Form>

            <FlexContainerModal>
              <List
                size="small"
                header={"Emails"}
                dataSource={userForUpdate.emails}
                itemLayout="horizontal"
                bordered
                renderItem={(item, index) => (
                  <List.Item
                    onClick={() => deleteFromList(userForUpdate.emails, index)}
                  >
                    {item.email}
                  </List.Item>
                )}
                style={{
                  height: "fit-content",
                  maxWidth: "253px",
                  overflow: "hidden"
                }}
              />
              <List
                size="small"
                header={"Numbers"}
                dataSource={userForUpdate.numbers}
                itemLayout="horizontal"
                bordered
                renderItem={(item, index) => (
                  <List.Item
                    onClick={() => deleteFromList(userForUpdate.numbers, index)}
                  >
                    {item.number}
                  </List.Item>
                )}
                style={{
                  height: "fit-content",
                  overflow: "hidden"
                }}
              />
            </FlexContainerModal>

            <Space direction="horizontal" size="small">
              <Button
                onClick={() => {
                  sendUpdate()
                  setOpen(false)
                }}
                htmlType="submit"
                style={{
                  width: "fit-content"
                }}
              >
                Save
              </Button>

              <Button
                onClick={() => sendDelete()}
                style={{
                  width: "fit-content"
                }}
              >
                Delete
              </Button>
            </Space>
          </div>
        </Modal>
      )}
    </>
  )
}

export default UserCard
