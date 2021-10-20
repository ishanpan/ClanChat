import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import styles from "./SignUp.module.css";
import { useSelector, useDispatch } from "react-redux";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { login, logout, loginUser, setNickname } from "../store/authSlice";
import { useHistory } from "react-router-dom";
import { collection, query, where } from "firebase/firestore";
import { app } from "./config";
import { getFirestore } from "firebase/firestore";

const SignIn = () => {
	const dispatch = useDispatch();
	let history = useHistory();
	let userData = useSelector((state) => state.auth.userInfo);
	const auth = getAuth();
	const formik = useFormik({
		initialValues: {
			email: "",
			password: "",
		},
		validationSchema: Yup.object({
			password: Yup.string()
				.max(20, "Must be 20 characters or less")
				.required("Incomplete form"),

			email: Yup.string()
				.email("Invalid email address")
				.required("Incomplete form"),
		}),
		onSubmit: (values) => {
			signInWithEmailAndPassword(auth, values.email, values.password)
				.then((userCredential) => {
					const user = userCredential.user;
					dispatch(login());
					dispatch(loginUser(user.uid));

					const db = getFirestore(app);
					const dataRef = collection(db, "nicknames");
					const q = query(dataRef, where("uuid", "==", `${user.uid}`));
					dispatch(setNickname(q.name));
					console.log(q.name);
					history.pushState("/welcome");
				})
				.catch((error) => {
					const errorCode = error.code;
					const errorMessage = error.message;
					alert("ERROR");
				});
		},
	});
	return (
		<div className={styles.form}>
			<form className={styles.inputs} onSubmit={formik.handleSubmit}>
				<div className={styles.formheading}>ClanChat</div>

				<div className={styles.formlabin}>
					<input
						className={styles.forminput}
						id="email"
						name="email"
						type="email"
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.email}
						placeholder="johndoe@xyz.com"
					/>
				</div>
				<div className={styles.formlabin}>
					<input
						className={styles.forminput}
						id="password"
						name="password"
						type="password"
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.firstName}
						placeholder="joe_ligma@12"
					/>
				</div>
				<div className={styles.formlabin}>
					<div className={styles.submitbtn}>
						<button className={styles.submitbtntext} type="submit">
							Log In
						</button>
					</div>
					<div className={styles.login}>Don't Have An Account? Sign Up</div>
				</div>
			</form>
		</div>
	);
};

export default SignIn;

/*{
    "uid": "R6v9tttv10Q04RkYbEUQkvWhB442",
    "email": "ishanpandey2905@gmail.com",
    "emailVerified": false,
    "isAnonymous": false,
    "providerData": [
        {
            "providerId": "password",
            "uid": "ishanpandey2905@gmail.com",
            "displayName": null,
            "email": "ishanpandey2905@gmail.com",
            "phoneNumber": null,
            "photoURL": null
        }
    ],
    "stsTokenManager": {
        "refreshToken": "ACzBnCiMVpvDDWFcwm3nWLhVD79ma2bKXNILqfyvHiYP0vzdDb1obt1pMzdW7O5VsghbI0fUsO6tkOY6CiItnG-dHeV-ZwRdL49vTcquN8YF0zv1AC6uhWExadbqc7JrnsQqNQB6AwdAz8D_fWUiAXohKcZCv2WeoDszuZy263AHFUnPBbsV5ByvACWU_C9LPjCN_S8ilpTq1cGUOULzkAEqhgRPbEVaTA",
        "accessToken": "eyJhbGciOiJSUzI1NiIsImtpZCI6ImFlNTJiOGQ4NTk4N2U1OWRjYWM2MmJlNzg2YzcwZTAyMDcxN2I0MTEiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vY2hhdGFwcC04Y2UzMCIsImF1ZCI6ImNoYXRhcHAtOGNlMzAiLCJhdXRoX3RpbWUiOjE2MzE4Nzc3NjEsInVzZXJfaWQiOiJSNnY5dHR0djEwUTA0UmtZYkVVUWt2V2hCNDQyIiwic3ViIjoiUjZ2OXR0dHYxMFEwNFJrWWJFVVFrdldoQjQ0MiIsImlhdCI6MTYzMTg3Nzc2MSwiZXhwIjoxNjMxODgxMzYxLCJlbWFpbCI6ImlzaGFucGFuZGV5MjkwNUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsiaXNoYW5wYW5kZXkyOTA1QGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.vJQf6OGoRPEQ7D1rhj1sD8BeMG-CXT3HcS7OVQ4sn-0Tzb_fVV6FGzpMGxQJG5dQXzPKdCJtEuxyDcuS0GNeFAReDrm4Dg0ORK737IUECIOJY-aTfjWdnxIn4yCMkroeZe8cIJAeHNc-v0eoPEAmmvz_GGJG9BZIXLjMJtKMN3QbJ4hPED_9pmO0Yh20mqN1GUc3vRwQ4l_V7d57uV7FzqaxRAye975kmlA0fiLcfFH9uZ_72bDtgyLvisqvgdYL20m_mxZFPV9QdLmsv_HHoiqPM6FsAKYGwN3dXdg2EElLgFsYu9DaSX41GCZtg0a9LarFgoYUu3trsPlHi4ZBpg",
        "expirationTime": 1631881359262
    },
    "createdAt": "1631877691870",
    "lastLoginAt": "1631877691870",
    "apiKey": "AIzaSyCjMSqcyCOfvG9yH5yKoWqJLXDGb_bUN5A",
    "appName": "[DEFAULT]"
}
*/
