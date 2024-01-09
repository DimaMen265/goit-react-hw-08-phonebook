import { useSelector, useDispatch } from "react-redux";
import { changeFilter } from "../../redux/filterSlice";
import { selectFilter } from "../../redux/selectors";
import styles from "./Filter.module.css";

export const Filter = () => {
    const dispatch = useDispatch();
    const filter = useSelector(selectFilter);

    return (
        <div className={styles.wrapper}>
            <p className={styles.text}>Find contacts by name</p>
            <input
                type="text"
                name="filter"
                value={filter}
                onChange={e => {
                    dispatch(changeFilter(e.target.value));
                }}
                placeholder="Enter a name..."
                className={styles.filter}
            />
        </div>
    );
};
