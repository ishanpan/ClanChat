import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import styles from "./SignUp.module.css";

const SignUp = () => {
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required("Required"),
      lastName: Yup.string()
        .max(20, "Must be 20 characters or less")
        .required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
    }),
    onSubmit: (values) => {
      console.log(values.firstName);
    },
  });
  return (
    <div className={styles.form}>
      <form className={styles.inputs} nSubmit={formik.handleSubmit}>
        <div className={styles.formheading}>Create An Account</div>
        <div className={styles.formlabin}>
          <input
            className={styles.forminput}
            id="firstName"
            name="firstName"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.firstName}
            placeholder="John_Doe"
          />
          {formik.touched.firstName && formik.errors.firstName ? (
            <div className={styles.formerr}>{formik.errors.firstName}</div>
          ) : null}
        </div>

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
          {formik.touched.email && formik.errors.email ? (
            <div className={styles.formerr}>{formik.errors.email}</div>
          ) : null}
        </div>
        <div className={styles.formlabin}>
          <div className={styles.submitbtn}>
            <button className={styles.submitbtntext} type="submit">
              Create Account
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
