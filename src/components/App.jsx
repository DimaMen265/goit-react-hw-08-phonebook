import { Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { refreshUser } from "../redux/auth/operations";
import { Header } from "./Header/Header";
import { Contacts } from "pages/Contacts";
import { Login } from "pages/Login";
import { Register } from "pages/Register";
import { PrivateRoute } from "./PrivateRoute";
import { RestrictedRoute } from "./RestrictedRoute";

export const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(refreshUser());
    }, [dispatch]);

    return (
        <Routes>
            <Route path="/" element={<Header />}>
                <Route
                    path="/register"
                    element={
                        <RestrictedRoute redirectTo="/contacts" component={<Register />}
                        />
                    }
                />
                <Route
                    path="/login"
                    element={
                        <RestrictedRoute redirectTo="/contacts" component={<Login />}
                        />
                    }
                />
                <Route
                    path="/contacts"
                    element={
                        <PrivateRoute redirectTo="/login" component={<Contacts />}
                        />
                    }
                />
            </Route>
        </Routes>
    );
};
