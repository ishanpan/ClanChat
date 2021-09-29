import { Fragment } from "react";
import styles from "./Welcome.module.css";
import homeSVG from "../static/home-outline.svg";
import chatSVG from "../static/chatbubbles-outline.svg";
import settingsSVG from "../static/settings-outline.svg";
const Welcome = (props) => {
	return (
		<Fragment>
			<div className={styles.items}>
				<div className={styles.nav}>
					<img src={homeSVG} className={styles.iconChat} alt="Icon chat" />
					<img src={chatSVG} className={styles.iconChat} alt="Icon chat" />
					<img src={settingsSVG} className={styles.iconChat} alt="Icon chat" />
				</div>
				<div className={styles.textitems}>
					<div>👋</div>
					<div>Hello, {props.nickname} </div>
					<div>Click chat icon to start chatting</div>
				</div>
			</div>
		</Fragment>
	);
};

export default Welcome;
