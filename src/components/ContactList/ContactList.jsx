import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectContacts, selectFilter, selectIsLoading, selectError } from "../../redux/selectors";
import { fetchContacts, deleteContact } from "../../redux/operations";
import styles from "./ContactList.module.css";

export const ContactList = () => {
    const dispatch = useDispatch();
    const contacts = useSelector(selectContacts);
    const filter = useSelector(selectFilter);
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
                contacts.length > 0 ? (
                    <ul className={styles.listContact}>
                        {(filter.length > 0
                            ? contacts.filter(item => item.name.toLowerCase().includes(filter.toLowerCase()))
                            : contacts
                        ).map(item => (
                            <li key={item.id}>
                                <div className={styles.wrapperItem}>
                                    <p className={styles.textItem}>
                                        {item.name}: <a href={`tel:${item.number}`} className={styles.tel} >{item.number}</a> 
                                    </p>
                                    
                                    <button onClick={() => dispatch(deleteContact(item.id))} className={styles.buttonDelete}>Delete</button>
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