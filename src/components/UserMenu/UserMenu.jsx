import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../../redux/auth/selectors";
import { logOut } from "../../redux/auth/operations";
import styles from "./UserMenu.module.css";

export const UserMenu = () => {
    const user = useSelector(selectUser);
    const dispatch = useDispatch();

    return (
        <div className={styles.userContainer}>
            <p className={styles.userName}>{user.name}</p>
            <button onClick={() => dispatch(logOut())} className={styles.logOutBth}>Log out</button>
        </div>
    );
};
