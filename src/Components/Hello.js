import styles from "./Welcome.module.css";
import Sidenav from "./Sidenav";
import { Fragment } from "react";
import { useSelector } from "react-redux";
import { collection, query, where } from "firebase/firestore";
import { app } from "./config";
import { getFirestore } from "firebase/firestore";

const Hello = (props) => {
	let logg = useSelector((state) => state.auth.userInfo);
	const db = getFirestore(app);
	const dataRef = collection(db, "nicknames");
	const q = query(dataRef, where("uuid", "==", `${logg}`));

	return (
		<Fragment>
			<div className={styles.items}>
				<Sidenav />
				<div className={styles.textitems}>
					<div>👋</div>
					<div>Hello, {q.name} </div>
					<div>Click chat icon to start chatting</div>
				</div>
			</div>
		</Fragment>
	);
};

export default Hello;
