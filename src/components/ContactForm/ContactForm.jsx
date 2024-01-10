import { useSelector, useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { selectContacts } from "../../redux/contacts/selectors";
import { addContact } from "../../redux/contacts/operations";
import { nanoid } from "nanoid";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import styles from "./ContactForm.module.css";

const initialValues = {
  name: "",
  number: "",
};

let userSchema = yup.object({
  name: yup
    .string()
    .matches(/^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/)
    .required(),
  number: yup
    .string()
    .matches(/\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/)
    .required(),
});

export const ContactForm = () => {
    const dispatch = useDispatch();
    const contacts = useSelector(selectContacts);

    const handleOnSubmit = (values, { resetForm }) => {
        if (contacts.find(contact => contact.name.toLowerCase() === values.name.toLowerCase()) === undefined) {
            const item = { id: nanoid(), name: values.name, number: values.number };

            dispatch(addContact(item))
                .then(unwrapResult)
                .catch(errorText => {
                    alert(errorText);
                });

            resetForm();
        } else {
            alert(`${values.name} is already in contacts.`);
        };
    };

    return (
        <Formik initialValues={initialValues} onSubmit={handleOnSubmit} validationSchema={userSchema}>
            <Form className={styles.form}>
                <label htmlFor="name" className={styles.labelName}>Name</label>
                <Field
                    type="text"
                    name="name"
                    id="name"
                    title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                    placeholder="Enter a name..."
                    className={styles.input}
                />
                <ErrorMessage name="name">
                    {() => (
                        <p className={styles.errorText}>
                            Wrong name: Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob
                            Mercer, Charles de Batz de Castelmore d'Artagnan
                        </p>
                    )}
                </ErrorMessage>

                <label htmlFor="number" className={styles.labelNumber}>Number</label>
                <Field
                    type="tel"
                    name="number"
                    id="number"
                    title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                    placeholder="Enter a phone number..."
                    className={styles.input}
                />
                <ErrorMessage name="number">
                    {() => (
                        <p className={styles.errorText}>The phone number must consist of numbers and cannot contain spaces, dashes, round brackets and must begin with +</p>
                    )}
                </ErrorMessage>

                <button type="submit" className={styles.buttonForm}>Add contact</button>
            </Form>
        </Formik>
    );
};
