import { StyledContactList } from "./style"
import { IContact } from "../../providers/contact"
import { IUser } from "../../providers/user"
import { Typography } from "antd"
import ContactCard from "../ContactCard"

const ContactList = ({
  setUser,
  contactList,
  setContactList
}: {
  setUser: React.Dispatch<React.SetStateAction<IUser | undefined>>
  contactList: IContact[]
  setContactList: React.Dispatch<React.SetStateAction<IContact[]>>
}) => {
  return (
    <StyledContactList
      style={
        contactList.length === 0
          ? {
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }
          : undefined
      }
    >
      {contactList.length > 0 ? (
        <>
          {contactList.map((contact) => (
            <ContactCard
              contact={contact}
              setContactList={setContactList}
              setUser={setUser}
              key={contact.id}
            />
          ))}
        </>
      ) : (
        <li className="ContactList__li--placeholder">
          <Typography.Text
            strong
            style={{
              fontSize: "20px"
            }}
          >
            No contacts...
          </Typography.Text>
        </li>
      )}
    </StyledContactList>
  )
}

export default ContactList
