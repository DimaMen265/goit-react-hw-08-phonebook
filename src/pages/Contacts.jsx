import { ContactForm } from "components/ContactForm/ContactForm";
import { ContactList } from "components/ContactList/ContactList";
import { Filter } from "components/Filter/Filter";
import { styled } from "styled-components";

const Container = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const PhonebookTitle = styled.h1`
  font-weight: 500;
  margin-bottom: 20px;
`;

const ContactsTitle = styled.h2`
  font-weight: 500;
  margin-bottom: 20px;
`;

export const Contacts = () => {
  return (
    <Container>
      <PhonebookTitle>Phonebook</PhonebookTitle>
      <ContactForm />
      <ContactsTitle>Contacts</ContactsTitle>
      <Filter />
      <ContactList />
    </Container>
  );
};
