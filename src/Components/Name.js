import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import styles from "./SignUp.module.css";
import { useSelector, useDispatch } from "react-redux";
import { doc, setDoc } from "firebase/firestore";
import { app } from "./config";
import { getFirestore } from "firebase/firestore";
import { useHistory } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";

const Name = () => {
  useEffect(() => {
    if (localStorage.length <= 1) {
      history.push("/signin");
    } else {
    }
  }, []);

  let details = window.localStorage.getItem("uuid");
  const userData = details.slice(0, -1);
  let history = useHistory();
  const db = getFirestore(app);
  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Incomplete form"),
    }),
    onSubmit: (values) => {
      async function name() {
        const docRef = await addDoc(collection(db, "nicknames"), {
          name: `${values.name}`,
          uuid: userData,
        });
        history.push("/welcome");
      }
      name();
    },
  });
  return (
    <div className={styles.form}>
      <form className={styles.inputs} onSubmit={formik.handleSubmit}>
        <div className={styles.formheading}>Set A Nickname</div>

        <div className={styles.formlabin}>
          <input
            className={styles.forminput}
            id="name"
            name="name"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            placeholder="Johnny"
          />
        </div>
        <div className={styles.formlabin}>
          <div className={styles.submitbtn}>
            <button className={styles.submitbtntext} type="submit">
              Next
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Name;
