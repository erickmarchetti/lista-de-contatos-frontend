import { Layout, Button, Typography, Spin, Divider, Space, message } from "antd"
import { SyncOutlined } from "@ant-design/icons"

import UseUserContext, { IUser } from "../../providers/user"
import { useEffect, useState } from "react"

import { useNavigate } from "react-router-dom"
import UserCard from "../../components/UserCard"
import UseContactContext, {
  CreateContactData,
  IContact
} from "../../providers/contact"
import Modal from "../../components/Modal"
import ContactList from "../../components/ContactList"

const initialNewContact = {
  full_name: "new contact",
  emails: [],
  numbers: []
}

const Profile = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [contactModal, setContactModal] = useState<boolean>(false)
  const [user, setUser] = useState<IUser | undefined>(undefined)
  const [contactList, setContactList] = useState<IContact[]>([])
  const [newContact, setNewContact] =
    useState<CreateContactData>(initialNewContact)
  const { getUserInfos } = UseUserContext()
  const { createContact, getAllContacts } = UseContactContext()
  const navigate = useNavigate()

  useEffect(() => {
    setIsLoading(true)
    getUserInfos().then((res) => {
      setUser(res)
      setIsLoading(false)
    })
    getAllContacts().then((res) => {
      if (res) {
        setContactList(res)
      } else {
        setUser(undefined)
      }
    })
  }, [])

  const sendCreateContact = () => {
    createContact(newContact).then((res) => {
      setContactModal(false)
      if (res) {
        message.success("Contact created!")
        getAllContacts().then((res) => setContactList(res))
        setNewContact(initialNewContact)
      } else {
        setUser(undefined)
      }
    })
  }

  return (
    <Layout.Content
      style={
        isLoading || !user
          ? {
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }
          : {
              width: "100%",
              height: "100%",
              display: "flex",
              flexFlow: "column nowrap",
              alignItems: "center"
            }
      }
    >
      {isLoading ? (
        <Spin
          indicator={
            <SyncOutlined
              spin
              style={{
                fontSize: "70px",
                color: "#4096ff"
              }}
            />
          }
        />
      ) : user ? (
        <>
          <UserCard user={user} setUser={setUser} setIsLoading={setIsLoading} />
          {contactModal && (
            <Modal
              mainObject={newContact}
              setMainObject={setNewContact}
              setOpen={setContactModal}
              onSave={sendCreateContact}
            />
          )}
          <Divider
            children={
              <Space direction="horizontal" size="middle">
                <Button onClick={() => navigate("/login")}>Login</Button>

                <Button onClick={() => setContactModal(true)}>
                  New Contact
                </Button>
              </Space>
            }
          />
          <ContactList
            setUser={setUser}
            contactList={contactList}
            setContactList={setContactList}
          />
        </>
      ) : (
        <Layout
          style={{
            width: "100%",
            maxWidth: "400px",
            display: "flex",
            flexFlow: "column nowrap",
            alignItems: "center",
            gap: "10px",
            backgroundColor: "white"
          }}
        >
          <Typography.Title level={1}>User not found...</Typography.Title>
          <Button
            size="large"
            onClick={() => navigate("/login")}
            style={{
              fontSize: "24px",
              width: "fit-content",
              height: "fit-content"
            }}
          >
            Login
          </Button>
        </Layout>
      )}
    </Layout.Content>
  )
}

export default Profile
