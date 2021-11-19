import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import styles from "./SignUp.module.css";
import { useSelector, useDispatch } from "react-redux";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { login, logout, loginUser, setNickname } from "../store/authSlice";
import { useHistory } from "react-router-dom";
import { collection, query, where } from "firebase/firestore";
import { app } from "./config";
import { getFirestore } from "firebase/firestore";

import { useToast, Box } from "@chakra-ui/react";
import { CircularProgress } from "@chakra-ui/progress";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
} from "react-router-dom";

const SignIn = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const toast = useToast();

  const dispatch = useDispatch();
  let history = useHistory();
  let userData = useSelector((state) => state.auth.userInfo);
  const auth = getAuth();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .max(20, "Must be 20 characters or less")
        .required("Incomplete form"),

      email: Yup.string()
        .email("Invalid email address")
        .required("Incomplete form"),
    }),
    onSubmit: (values) => {
      setLoading(true);
      signInWithEmailAndPassword(auth, values.email, values.password)
        .then((userCredential) => {
          const user = userCredential.user;
          //console.log(userCredential.user);
          dispatch(login());
          dispatch(loginUser(user.uid));

          window.localStorage.setItem("uuid", `${user.uid}}`);
          window.localStorage.setItem(
            "email",
            `${JSON.stringify(user.email)}}`
          );

          history.push("/welcome");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setLoading(false);
          setError(true);
          console.log(errorMessage);
        });
    },
  });
  useEffect(() => {
    setError(false);
  }, [error]);
  return (
    <div className={styles.form}>
      <form className={styles.inputs} onSubmit={formik.handleSubmit}>
        <div className={styles.formheading}>ClanChat</div>

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
          {loading && (
            <div className={styles.submitbtn}>
              <button className={styles.submitbtntext} type="submit"></button>
              <CircularProgress
                isIndeterminate
                color="green.300"
                thickness="12px"
                capIsRound
              />
            </div>
          )}
          {!loading && (
            <div className={styles.submitbtn}>
              <button className={styles.submitbtntext} type="submit">
                Log In
              </button>
            </div>
          )}

          <div className={styles.login}>
            Don't Have An Account?{" "}
            <Link Link to="/signup">
              <button>Sign Up</button>
            </Link>
          </div>
        </div>
      </form>
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
              Invalid credentials or user doesn't exist!
            </Box>
          ),
        })}
    </div>
  );
};

export default SignIn;
