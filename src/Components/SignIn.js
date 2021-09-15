import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import styles from "./SignUp.module.css";

const SignIn = () => {
	const formik = useFormik({
		initialValues: {
			firstName: "",
			lastName: "",
			email: "",
		},
		validationSchema: Yup.object({
			firstName: Yup.string()
				.max(15, "Must be 15 characters or less")
				.required("Incomplete form"),

			email: Yup.string()
				.email("Invalid email address")
				.required("Incomplete form"),
		}),
		onSubmit: (values) => {
			console.log(values.firstName);
		},
	});
	return (
		<div className={styles.form}>
			<form className={styles.inputs} nSubmit={formik.handleSubmit}>
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
