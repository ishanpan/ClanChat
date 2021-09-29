import styles from "./Welcome.module.css";
import Sidenav from "./Sidenav";
import { Fragment } from "react";

const Chat = (props) => {
	return (
		<Fragment>
			<div className={styles.items}>
				<Sidenav />
			</div>
		</Fragment>
	);
};

export default Chat;
