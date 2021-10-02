import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import styles from "./SignUp.module.css";
import config from "./config";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useSelector, useDispatch } from "react-redux";
import { login, logout } from "../store/authSlice";

const SignUp = () => {
  const auth = getAuth();
  let count = useSelector((state) => state.auth.loggedin);
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      password: "",
      lastName: "",
      email: "",
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .max(21, "Must be 21 characters or less")
        .required("Incomplete form"),

      email: Yup.string()
        .email("Invalid email address")
        .required("Incomplete form"),
    }),
    onSubmit: (values) => {
      createUserWithEmailAndPassword(auth, values.email, values.password)
        .then((userCredential) => {
          // Signed in

          const user = userCredential.user;
          //Create a store and save this in local browser storage
          // ...
          dispatch(login());
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(error);
          // ..
        });
    },
  });
  return (
    <div className={styles.form}>
      <form className={styles.inputs} onSubmit={formik.handleSubmit}>
        <div className={styles.formheading}>Create An Account</div>

        <div className={styles.formlabin}>
          <input
            className={styles.forminput}
            id="email"
            name="email"
            type="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            placeholder="johndoe@xyz.com"
          />
        </div>
        <div className={styles.formlabin}>
          <input
            className={styles.forminput}
            id="password"
            name="password"
            type="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.firstName}
            placeholder="joe_ligma@12"
          />
        </div>
        <div className={styles.formlabin}>
          <div className={styles.submitbtn}>
            <button className={styles.submitbtntext} type="submit">
              Create Account
            </button>
          </div>
          <div className={styles.login}>
            Already Have An Account? <a href="#">Sign In</a>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
