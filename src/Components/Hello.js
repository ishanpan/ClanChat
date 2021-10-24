import styles from "./Welcome.module.css";
import Sidenav from "./Sidenav";
import { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { collection, query, where, getDocs } from "firebase/firestore";
import { app } from "./config";
import { getFirestore } from "firebase/firestore";
import { useHistory } from "react-router-dom";

const Hello = (props) => {
	const [name, setName] = useState("");
	const logg = useSelector((state) => state.auth.userInfo);
	let history = useHistory();
	useEffect(() => {
		const db = getFirestore(app);
		const dataRef = collection(db, "nicknames");
		const details = window.localStorage.getItem("uuid");
		const slice = details.slice(0, -1);
		const q = query(dataRef, where("uuid", "==", `${slice}`));
		//console.log(details);
		const a = async () => {
			const querySnapshot = await getDocs(q);
			querySnapshot.forEach((doc) => {
				// doc.data() is never undefined for query doc snapshots
				setName(doc.data().name);
			});
		};
		a();

		//history.push("/chat")
	}, []);
	return (
		<Fragment>
			<div className={styles.items}>
				<Sidenav />
				<div className={styles.textitems}>
					<div>👋</div>
					<div>Hello, {name} </div>
					<div>Click chat icon to start chatting</div>
				</div>
			</div>
		</Fragment>
	);
};

export default Hello;
