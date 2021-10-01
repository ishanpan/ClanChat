import styles from "./Welcome.module.css";
import Sidenav from "./Sidenav";
import { Fragment } from "react";
import { PaperPlaneRight } from "phosphor-react";

import pf from "../static/sponge.PNG";
import call from "../static/call-outline.svg";
import send from "../static/send-sharp.svg";

const Chat = (props) => {
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
						<input className={styles.textInput}></input>

						<PaperPlaneRight className={styles.sendIcon} size={40} />
					</div>
				</div>
			</div>
		</Fragment>
	);
};

export default Chat;
