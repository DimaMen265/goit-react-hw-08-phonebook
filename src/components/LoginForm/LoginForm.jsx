import { useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { logIn } from "../../redux/auth/operations";
import { Formik, ErrorMessage, Form, Field } from "formik";
import * as yup from "yup";
import styles from "./LoginForm.module.css";

const initialValues = {
    email: "",
    password: "",
};

let userSchema = yup.object({
    email: yup.string().email().required(),
    password: yup.string().min(8).required(),
});

export const LoginForm = () => {
    const dispatch = useDispatch();

    const handleOnSubmit = (values, { resetForm }) => {
        const valuesObject = {
            email: values.email,
            password: values.password,
        };

        dispatch(logIn(valuesObject))
            .then(unwrapResult)
            .catch(errorText => {
                alert(errorText);
            });

        resetForm();
    };

    return (
        <Formik initialValues={initialValues} validationSchema={userSchema} onSubmit={handleOnSubmit}>
            <Form className={styles.loginForm}>
                <label htmlFor="email" className={styles.labelEmail}>Email</label>
                <Field
                    type="email"
                    name="email"
                    id="email"
                    title="email"
                    placeholder="Enter an email..."
                    className={styles.inputLogin}
                />
                <ErrorMessage name="email">
                    {() => (
                        <p className={styles.errorText}>Wrong email!</p>
                    )}
                </ErrorMessage>

                <label htmlFor="password" className={styles.labelPassword}>Password</label>
                <Field
                    type="password"
                    name="password"
                    id="password"
                    title="password"
                    placeholder="Enter a password...(min: 8 letters)"
                    className={styles.inputLogin}
                />
                <ErrorMessage name="password">
                    {() => (
                        <p className={styles.errorText}>Wrong password!</p>
                    )}
                </ErrorMessage>

                <button type="submit" className={styles.bthLoginForm}>Log in</button>
            </Form>
        </Formik>
    );
};
