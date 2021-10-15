import styles from "./Welcome.module.css";
import Sidenav from "./Sidenav";
import { Fragment } from "react";
import { PaperPlaneRight } from "phosphor-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import pf from "../static/sponge.PNG";
import call from "../static/call-outline.svg";
import send from "../static/send-sharp.svg";
import { doc, addDoc } from "firebase/firestore";
import { app } from "./config";
import { getFirestore } from "firebase/firestore";
import { useSelector } from "react-redux";
import stylesas from "./TextWindow.module.css";
import { collection, query, getDocs, orderBy } from "firebase/firestore";
import { useState, useEffect } from "react";

const Chat = (props) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    let temp = [];
    const a = async () => {
      const q = query(collection(db, "chathistory"));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        temp.push(doc.data().msg);
      });
    };
    a();
    setData(temp);
  }, []);

  useEffect(() => {
    console.log("dhat");
    let b = data[0];
    b.forEach((datas)=>{
      console.log(datas);
    })
  }, [data]);

  //can create a custom hook i think
  let userData = useSelector((state) => state.auth.userInfo);
  const db = getFirestore(app);
  const formik = useFormik({
    initialValues: {
      msg: "",
    },
    validationSchema: Yup.object({
      msg: Yup.string().required("Incomplete form"),
    }),
    onSubmit: (values) => {
      async function sendMsg() {
        const d = new Date();
        const t = d.getTime();
        await addDoc(collection(db, "chathistory"), {
          uuid: `${userData}`,
          msg: `${values.msg}`,
          timestamp: `${t}`,
        });
        console.log("HELLO");
      }
      sendMsg();
    },
  });

  return (
    <Fragment>
      <div className={styles.items}>
        <Sidenav />
        <div className={styles.chatWindow}>
          <div className={styles.header}>
            <img src={pf} className={styles.header__pf} alt="profile pic" />
            <div className={styles.header__name}>Clan#1</div>
            <a href="#">
              <img src={call} className={styles.callIcon} alt="Call icon"></img>
            </a>
          </div>
          <div className={styles.textWindow}>
            <ul className={stylesas.text}>{data}</ul>,
          </div>
          <div className={styles.sendMsg}>
            <form onSubmit={formik.handleSubmit} className={styles.bottom}>
              <input
                className={styles.textInput}
                id="msg"
                name="msg"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.msg}
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
