import { StyledCard, FlexContainer, FlexContainerModal, Modal } from "./style"
import { Typography, List, Button, Form, Input, Space } from "antd"
import { CloseOutlined, PlusOutlined } from "@ant-design/icons"
import { IUser } from "../../providers/user"

import { useForm, Controller } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useState } from "react"

// interface UpdateUserFormFields {
//   full_name: string
//   password: string
//   email: string
//   number: string
// }

// const updateUserSchema = yup.object({
//   full_name: yup.string().max(50).required(),
//   password: yup.string().required(),
//   email: yup.string().max(40).email().required(),
//   number: yup
//     .string()
//     .min(9)
//     .max(13)
//     .matches(/^[0-9]+$/, "This field must have only numbers")
//     .required()
// })

const UserCard = ({ user }: { user: IUser }) => {
  const [open, setOpen] = useState<boolean>(false)

  // const {
  //   control,
  //   handleSubmit,
  //   formState: { errors }
  // } = useForm<UpdateUserFormFields>({
  //   mode: "onSubmit",
  //   reValidateMode: "onChange",
  //   shouldFocusError: false,
  //   shouldUnregister: false,
  //   resolver: yupResolver(updateUserSchema)
  // })

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

            <Form onFinish={(data) => console.log(data)}>
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
                <Input placeholder="Enter your new name" />
              </Form.Item>
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
                  addonAfter={<PlusOutlined />}
                />
              </Form.Item>
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

              <FlexContainerModal>
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
              </FlexContainerModal>

              <Space direction="horizontal" size="small">
                <Button
                  htmlType="submit"
                  style={{
                    width: "fit-content"
                  }}
                >
                  Save
                </Button>

                <Button
                  onClick={() => setOpen(false)}
                  style={{
                    width: "fit-content"
                  }}
                >
                  Delete
                </Button>
              </Space>
            </Form>
          </div>
        </Modal>
      )}
    </>
  )
}

export default UserCard
