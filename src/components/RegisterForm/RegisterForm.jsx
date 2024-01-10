import { useDispatch } from "react-redux";
import { register } from "../../redux/operations";
import { Formik, ErrorMessage, Field } from "formik";
import * as yup from "yup";
import styles from "./RegisterForm.module.css";

const initialValues = {
    name: "",
    email: "",
    password: "",
};

let userSchema = yup.object({
    name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().min(8).required(),
});

export const RegisterForm = () => {
    const dispatch = useDispatch();

    const handleOnSubmit = (values, { resetForm }) => {
        const valuesObject = {
            name: values.name,
            email: values.email,
            password: values.password,
        };

        dispatch(register(valuesObject));

        resetForm();
    };

    return (
        <Formik initialValues={initialValues} validationSchema={userSchema} onSubmit={handleOnSubmit}>
            <form className={styles.registerForm}>
                <label htmlFor="name" className={styles.labelName}>Name</label>
                <Field
                    type="name"
                    name="name"
                    id="name"
                    title="name"
                    placeholder="Enter a name..."
                    className={styles.inputRegister}
                />
                <ErrorMessage name="name">
                    {() => (
                        <p className={styles.errorText}>Wrong name!</p>
                    )}
                </ErrorMessage>

                <label htmlFor="email" className={styles.labelEmail}>Email</label>
                <Field
                    type="email"
                    name="email"
                    id="email"
                    title="email"
                    placeholder="Enter a email..."
                    className={styles.inputRegister}
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
                    className={styles.inputRegister}
                />
                <ErrorMessage name="password">
                    {() => (
                        <p className={styles.errorText}>Wrong password!</p>
                    )}
                </ErrorMessage>

                <button type="submit" className={styles.bthRegisterForm}>Register</button>
            </form>
        </Formik>
    );
};
