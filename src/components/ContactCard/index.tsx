import { StyledCard, FlexContainer } from "./style"
import { List, message } from "antd"
import UseContactContext, { IContact } from "../../providers/contact"
import Modal from "../Modal"

import { useState } from "react"
import { IUser } from "../../providers/user"

interface ContactForUpdate {
  full_name: string
  emails: string[]
  numbers: string[]
}

const ContactCard = ({
  contact,
  setContactList,
  setUser
}: {
  contact: IContact
  setContactList: React.Dispatch<React.SetStateAction<IContact[]>>
  setUser: React.Dispatch<React.SetStateAction<IUser | undefined>>
}) => {
  const [contactModal, setContactModal] = useState<boolean>(false)
  const [contactForUpdate, setContactForUpdate] = useState<ContactForUpdate>({
    full_name: contact.full_name,
    emails: contact.emails.map((item) => item.email),
    numbers: contact.numbers.map((item) => item.number)
  })
  const { updateContact, deleteContact, getAllContacts } = UseContactContext()

  const sendUpdate = () => {
    setContactModal(false)
    updateContact(contact.id, contactForUpdate).then((res) => {
      if (res) {
        message.success("Contact updated!", 2)
        getAllContacts().then((res) => setContactList(res))
      } else {
        setUser(undefined)
      }
    })
  }

  const sendDelete = () => {
    setContactModal(false)
    deleteContact(contact.id).then((res) => {
      if (res) {
        message.success("Contact has been deleted", 2)
        getAllContacts().then((res) => setContactList(res))
      } else {
        setUser(undefined)
      }
    })
  }

  return (
    <>
      <StyledCard onClick={() => setContactModal(true)}>
        <div className="Card__head">
          <span className="Card__head__span">{contact.full_name}</span>
        </div>
        <div className="Card__body">
          <FlexContainer>
            <List
              size="small"
              header={"Emails"}
              dataSource={contact.emails}
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
              dataSource={contact.numbers}
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
      {contactModal && (
        <Modal
          mainObject={contactForUpdate}
          setMainObject={setContactForUpdate}
          setOpen={setContactModal}
          onSave={sendUpdate}
          onDelete={sendDelete}
        />
      )}
    </>
  )
}

export default ContactCard
