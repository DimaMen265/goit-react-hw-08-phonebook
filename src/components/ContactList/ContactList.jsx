import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectFilteredContacts, selectIsLoading, selectError } from "../../redux/contacts/selectors";
import { fetchContacts, deleteContact } from "../../redux/contacts/operations";
import styles from "./ContactList.module.css";

export const ContactList = () => {
    const dispatch = useDispatch();
    const filteredContacts = useSelector(selectFilteredContacts);
    const isLoading = useSelector(selectIsLoading);
    const error = useSelector(selectError);

    useEffect(() => {
        dispatch(fetchContacts());
    }, [dispatch]);
    
    return (
        <div className={styles.wrapper}>
            {isLoading && !error && <p className={styles.textInfo}>Request in progress...</p>}
            {error && <p className={styles.textInfo}>Error: {error}</p>}
            {!isLoading && !error && (
                filteredContacts.length > 0 ? (
                    <ul className={styles.listContact}>
                        {filteredContacts.map(contact => (
                            <li key={contact.id}>
                                <div className={styles.wrapperItem}>
                                    <p className={styles.textItem}>
                                        {contact.name}: <a href={`tel:${contact.number}`} className={styles.tel} >{contact.number}</a>
                                    </p>
                                    
                                    <button onClick={() => dispatch(deleteContact(contact.id))} className={styles.buttonDelete}>Delete</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className={styles.textInfo}>No contacts...</p>
                )
            )}
        </div>
    );
};
