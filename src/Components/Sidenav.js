import { Fragment } from "react";
import styles from "./Welcome.module.css";

import homeSVG from "../static/home-outline.svg";
import chatSVG from "../static/chatbubbles-outline.svg";
import settingsSVG from "../static/settings-outline.svg";
import pf from "../static/sponge.PNG";

const Sidenav = () => {
	return (
		<Fragment>
			<div className={styles.nav}>
				<img src={pf} className={styles.pf} alt="profile pic" />
				<a href="/welcome">
					<img src={homeSVG} className={styles.iconChat} alt="Icon chat"></img>
				</a>
				<a href="/chat">
					<img src={chatSVG} className={styles.iconChat} alt="Icon chat" />
				</a>
				<a href="#">
					<img src={settingsSVG} className={styles.iconChat} alt="Icon chat" />
				</a>
			</div>
		</Fragment>
	);
};

export default Sidenav;
