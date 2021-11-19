import { useFormik } from "formik";
import { Fragment, useState, useEffect } from "react";
import * as Yup from "yup";
import styles from "./reset.module.css";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import Sidenav from "./Sidenav";
import { useHistory } from "react-router-dom";
import { useToast, Box } from "@chakra-ui/react";

const Password = () => {
  let history = useHistory();
  const toast = useToast();
  const [error, setError] = useState(false);
  if (localStorage.length <= 1) {
    history.push("/signin");
  }
  const [emailsent, setEmailsent] = useState(false);
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
        .then(() => {
          setEmailsent(true);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setError(true);
        });
    },
  });
  useEffect(() => {
    setError(false);
  }, [error]);

  useEffect(() => {
    setEmailsent(false);
  }, [emailsent]);

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
      {emailsent &&
        toast({
          position: "top",
          render: () => (
            <Box
              color="white"
              p={3}
              bg="green.500"
              fontSize="large"
              borderRadius="3"
              textAlign="center"
            >
              Check your inbox for the provided email
            </Box>
          ),
        })}
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
              Error occurred!
            </Box>
          ),
        })}
    </Fragment>
  );
};

export default Password;
