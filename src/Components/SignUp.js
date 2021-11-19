import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import styles from "./SignUp.module.css";
import config from "./config";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useSelector, useDispatch } from "react-redux";
import { login, logout, loginUser } from "../store/authSlice";
import { useHistory } from "react-router-dom";
import { CircularProgress } from "@chakra-ui/progress";

import { useToast, Box } from "@chakra-ui/react";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
} from "react-router-dom";
import { Button, ButtonGroup } from "@chakra-ui/react";

const SignUp = () => {
  const toast = useToast();
  const auth = getAuth();
  let history = useHistory();
  let count = useSelector((state) => state.auth.loggedin);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      password: "",
      lastName: "",
      email: "",
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .min(8, "Password must be 8 characters or more")
        .required("Incomplete form"),

      email: Yup.string()
        .email("Invalid email address")
        .required("Incomplete form"),
    }),
    onSubmit: (values) => {
      setLoading(true);
      createUserWithEmailAndPassword(auth, values.email, values.password)
        .then((userCredential) => {
          // Signed in

          const user = userCredential.user;
          //Create a store and save this in local browser storage
          // ...

          window.localStorage.setItem("uuid", `${user.uid}}`);
          window.localStorage.setItem(
            "email",
            `${JSON.stringify(user.email)}}`
          );

          history.push("/nickname");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setLoading(false);
          setError(true);

          //alert(errorCode);
          // ..
        });
    },
  });
  useEffect(() => {
    setError(false);
  }, [error]);

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

        {formik.touched.email && formik.errors.email ? (
          <div className={styles.error}>{formik.errors.email}</div>
        ) : null}
        {formik.touched.password && formik.errors.password ? (
          <div className={styles.error}>{formik.errors.password}</div>
        ) : null}

        <div className={styles.formlabin}>
          <div className={styles.submitbtn}>
            {!loading && (
              <button className={styles.submitbtntext} type="submit">
                Create Account
              </button>
            )}

            {loading && (
              <button className={styles.submitbtntext} type="submit">
                <CircularProgress
                  isIndeterminate
                  color="green.300"
                  thickness="12px"
                  capIsRound
                />
              </button>
            )}
          </div>
          {error &&
            toast({
              position: "top",
              render: () => (
                <Box
                  color="white"
                  p={3}
                  bg="red.500"
                  fontSize="large"
                  borderRadius="3"
                  textAlign="center"
                >
                  -Mail already in use!E
                </Box>
              ),
            })}

          <div className={styles.login}>
            Already Have An Account?
            <Link Link to="/signin">
              <button>Sign In</button>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
