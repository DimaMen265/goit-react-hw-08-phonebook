import { Outlet, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import { UserMenu } from "components/UserMenu/UserMenu";
import { styled } from "styled-components";

const StyledLink = styled(NavLink)`
  color: gray;
  font-size: 16px;
  transition: color 250ms linear, font-weight 250ms linear;

  &:hover {
    color: black;
    font-weight: 500;
  }
  
  &.active {
    color: black;
    font-weight: 500;
  }
`;

const Navigation = styled.nav`
  display: flex;
  gap: 10px;
`;

export const Header = () => {
    const isLogged = useSelector(selectIsLoggedIn);

    return (
        <div>
            <header>
                <Navigation>
                    {isLogged && <StyledLink to="/contacts">Contacts</StyledLink>}
                    {!isLogged && <StyledLink to="/register">Register</StyledLink>}
                    {!isLogged && <StyledLink to="/login">Login</StyledLink>}
                </Navigation>

                {isLogged && (<UserMenu />)}
            </header>
            <Outlet />
        </div>
    );
};
