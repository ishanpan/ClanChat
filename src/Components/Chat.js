import { useState, useEffect, useRef, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";

import styles from "./Welcome.module.css";

import Sidenav from "./Sidenav";

import { useFormik } from "formik";
import * as Yup from "yup";

import pf from "../static/sponge.PNG";
import call from "../static/call-outline.svg";
import { PaperPlaneRight } from "phosphor-react";

import { app } from "./config";
import { getFirestore } from "firebase/firestore";

import { css } from "@emotion/react";
import PacmanLoader from "react-spinners/PacmanLoader";

import { useHistory } from "react-router-dom";

import {
	addDoc,
	collection,
	query,
	orderBy,
	onSnapshot,
} from "firebase/firestore";

import { loginUser } from "../store/authSlice";

const Chat = (props) => {
	const db = getFirestore(app);
	let history = useHistory();
	const dispatch = useDispatch();
	const [nicknames, setNicknames] = useState("");
	let logg = useSelector((state) => state.auth.userInfo);
	const nick = useSelector((state) => state.auth.nickname);
	const [data, setData] = useState([{}]);
	const [load, setLoad] = useState(0);
	const messageRef = useRef();
	let [loading, setLoading] = useState(true);
	let [color, setColor] = useState("#B8B3E9");
	const override = css`
		display: block;
		margin: 2 auto;
		border-color: red;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -60%);
	`;

	useEffect(() => {
		if (localStorage.length >= 1 && nick == "") {
			history.push("/welcome");
		} else if (localStorage.length <= 1) {
			history.push("/signin");
		} else {
			const details = window.localStorage.getItem("uuid");
			const slice = details.slice(0, -1);
			dispatch(loginUser(slice));
		}
	}, []);

	useEffect(() => {
		const a = async () => {
			const q = query(
				collection(db, "chathistory"),
				orderBy("timestamp", "asc")
			);

			const subscribe = onSnapshot(q, (snapshot) => {
				setLoad(1);
				snapshot.docChanges().forEach((change) => {
					if (change.type === "added") {
						setData((state) => [...state, change.doc.data()]);
					}
				});
			});
		};
		a();
	}, []);

	useEffect(() => {
		if (messageRef.current) {
			messageRef.current.scrollIntoView({
				behavior: "smooth",
				block: "end",
				inline: "nearest",
			});
		}
	}, [data]);

	//can create a custom hook i think
	let userData = useSelector((state) => state.auth.userInfo);
	const formik = useFormik({
		initialValues: {
			msg: "",
		},
		validationSchema: Yup.object({
			msg: Yup.string().required("Incomplete form"),
		}),
		onSubmit: (values) => {
			formik.resetForm();
			async function sendMsg() {
				const d = new Date();
				const t = d.getTime();
				await addDoc(collection(db, "chathistory"), {
					uuid: `${userData}`,
					msg: `${values.msg}`,
					nickname: `${nick}`,
					timestamp: `${t}`,
				});
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
						<PacmanLoader
							color={color}
							loading={!load}
							css={override}
							size={25}
						/>
						<ul className={styles.textWindowArea} ref={messageRef}>
							{data
								.filter((text) => Object.keys(text).length !== 0)
								.map((text) => (
									<li
										className={styles.chatBubble}
										style={{
											marginLeft: text.uuid === `${logg}` ? `auto` : "",
										}}
									>
										<p className={styles.chatBubbleText}>{text.msg}</p>
										<div className={styles.sender}>~{text.nickname}</div>
										<div className={styles.timeStamp}>
											{new Date(+text.timestamp).getHours()}:
											{new Date(+text.timestamp).getMinutes() < 9 && 0}
											{new Date(+text.timestamp).getMinutes()}

										</div>
									</li>
								))}
						</ul>
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
								autoComplete="off"
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
