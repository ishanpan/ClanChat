import { useFormik } from "formik";
import { Fragment } from "react";
import * as Yup from "yup";
import styles from "./reset.module.css";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import Sidenav from "./Sidenav";
import { useHistory } from "react-router-dom";

const Password = () => {
  let history = useHistory();
  if (localStorage.length <= 1) {
    history.push("/signin");
  }
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Incomplete form"),
    }),
    onSubmit: (values) => {
      console.log(values.email);
      const auth = getAuth();
      sendPasswordResetEmail(auth, values.email)
        .then(() => {})
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
        });
    },
  });

  return (
    <Fragment>
      <div className={styles.screen}>
        <Sidenav />

        <form className={styles.formlabin} onSubmit={formik.handleSubmit}>
          <p className={styles.textE}>
            Enter E-Mail address to reset your password
          </p>
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
          <div className={styles.submitbtn}>
            <button className={styles.submitbtntext} type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

export default Password;
