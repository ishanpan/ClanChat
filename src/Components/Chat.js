import styles from "./Welcome.module.css";
import Sidenav from "./Sidenav";
import { Fragment } from "react";
import { PaperPlaneRight } from "phosphor-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import pf from "../static/sponge.PNG";
import call from "../static/call-outline.svg";
import send from "../static/send-sharp.svg";

const Chat = (props) => {
  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Incomplete form"),
    }),
    onSubmit: (values) => {
      console.log(values.name);
    },
  });

  return (
    <Fragment>
      <div className={styles.items}>
        <Sidenav />
        <div className={styles.chatWindow}>
          <div className={styles.header}>
            <img src={pf} className={styles.header__pf} alt="profile pic" />
            <div className={styles.header__name}>Ishan</div>
            <a href="#">
              <img src={call} className={styles.callIcon} alt="Call icon"></img>
            </a>
          </div>
          <div className={styles.textWindow}></div>
          <div className={styles.sendMsg}>
            <form onSubmit={formik.handleSubmit} className={styles.bottom}>
              <input
                className={styles.textInput}
                id="name"
                name="name"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
                placeholder="Type a message"
              />
              <button type="submit">
                <PaperPlaneRight className={styles.sendIcon} size={40} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Chat;
