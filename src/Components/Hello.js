import styles from "./Welcome.module.css";
import Sidenav from "./Sidenav";
import { Fragment } from "react";

const Hello = (props) => {
	return (
		<Fragment>
			<div className={styles.items}>
				<Sidenav />
				<div className={styles.textitems}>
					<div>👋</div>
					<div>Hello, {props.nickname} </div>
					<div>Click chat icon to start chatting</div>
				</div>
			</div>
		</Fragment>
	);
};

export default Hello;
