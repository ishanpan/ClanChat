import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import styles from "./SignUp.module.css";
import { useSelector, useDispatch } from "react-redux";
import { doc, setDoc } from "firebase/firestore";
import { app } from "./config";
import { getFirestore } from "firebase/firestore";


const Name = () => {
  let userData = useSelector((state) => state.auth.userInfo);
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
        await setDoc(doc(db, "nicknames", `${userData}`), {
          name: `${values.name}`,
        });
        console.log("HELLO");
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
