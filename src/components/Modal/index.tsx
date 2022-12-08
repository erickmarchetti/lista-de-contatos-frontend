import { FlexContainerModal, StyledModal } from "./style"
import { Typography, List, Button, Form, Input, Space } from "antd"
import { CloseOutlined, PlusOutlined } from "@ant-design/icons"

interface MainObject {
  full_name: string
  emails: string[]
  numbers: string[]
}

interface ModalProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  mainObject: MainObject
  setMainObject: React.Dispatch<React.SetStateAction<MainObject>>
  onSave: () => void
  onDelete?: () => void
}

const Modal = ({
  setOpen,
  mainObject,
  setMainObject,
  onSave,
  onDelete
}: ModalProps) => {
  const addName = (data: { full_name: string }) => {
    data.full_name &&
      setMainObject({
        ...mainObject,
        full_name: data.full_name
      })
  }

  const addEmail = (data: { email: string }) => {
    data.email &&
      setMainObject({
        ...mainObject,
        emails: [data.email, ...mainObject.emails]
      })
  }

  const addNumber = (data: { number: string }) => {
    data.number &&
      setMainObject({
        ...mainObject,
        numbers: [data.number, ...mainObject.numbers]
      })
  }

  const deleteFromList = (list: string[], index: number) => {
    list.splice(index, 1)
    setMainObject({ ...mainObject })
  }

  return (
    <StyledModal>
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
          Current name: {mainObject.full_name}
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
            dataSource={mainObject.emails}
            itemLayout="horizontal"
            bordered
            renderItem={(item, index) => (
              <List.Item
                onClick={() => deleteFromList(mainObject.emails, index)}
              >
                {item}
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
            dataSource={mainObject.numbers}
            itemLayout="horizontal"
            bordered
            renderItem={(item, index) => (
              <List.Item
                onClick={() => deleteFromList(mainObject.numbers, index)}
              >
                {item}
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
              onSave()
              setOpen(false)
            }}
            htmlType="submit"
            style={{
              width: "fit-content"
            }}
          >
            Save
          </Button>

          {onDelete && (
            <Button
              onClick={() => onDelete()}
              style={{
                width: "fit-content"
              }}
            >
              Delete
            </Button>
          )}
        </Space>
      </div>
    </StyledModal>
  )
}

export default Modal
