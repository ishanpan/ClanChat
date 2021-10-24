import { Fragment } from "react";
import styles from "./Welcome.module.css";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
	useRouteMatch,
	useParams,
} from "react-router-dom";

import homeSVG from "../static/home-outline.svg";
import chatSVG from "../static/chatbubbles-outline.svg";
import settingsSVG from "../static/settings-outline.svg";
import pf from "../static/sponge.PNG";

const Sidenav = () => {
	return (
		<Fragment>
			<div className={styles.nav}>
				<img src={pf} className={styles.pf} alt="profile pic" />
				<li>
					<Link Link to="/welcome">
						<img
							src={homeSVG}
							className={styles.iconChat}
							alt="Icon chat"
						></img>
					</Link>
				</li>
				<li>
					<Link Link to="/chat">
						<img src={chatSVG} className={styles.iconChat} alt="Icon chat" />
					</Link>
				</li>
				<a href="#">
					<img src={settingsSVG} className={styles.iconChat} alt="Icon chat" />
				</a>
			</div>
		</Fragment>
	);
};

export default Sidenav;
