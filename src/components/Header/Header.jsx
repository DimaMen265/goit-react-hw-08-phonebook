import { Outlet, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectIsLoggedIn, selectUser } from "../../redux/selectors";
import { logOut } from "../../redux/operations";
import { styled } from "styled-components";
import styles from "./Header.module.css";

const StyledLink = styled(NavLink)`
  color: gray;
  font-size: 16px;
  transition: color 250ms linear, font-size 250ms linear;

  &:hover {
    color: black;
    font-size: 20px;
  }
  
  &.active {
    color: black;
    font-size: 20px;
  }
`;

export const Header = () => {
    const isLogged = useSelector(selectIsLoggedIn);
    const user = useSelector(selectUser);
    const dispatch = useDispatch();

    return (
        <div>
            <header>
                <nav className={styles.navigation}>
                    {isLogged && <StyledLink to="/contacts">Contacts</StyledLink>}
                    {!isLogged && <StyledLink to="/register">Register</StyledLink>}
                    {!isLogged && <StyledLink to="/login">Login</StyledLink>}
                </nav>

                {isLogged && (
                    <div className={styles.userContainer}>
                        <p className={styles.userName}>{user.name}</p>
                        <button onClick={() => dispatch(logOut())} className={styles.logOutBth}>Logout</button>
                    </div>
                )}
            </header>
            <Outlet />
        </div>
    )
}
