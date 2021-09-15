import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import styles from "./SignUp.module.css";

const SignUp = () => {
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
				<div className={styles.formheading}>Create An Account</div>
				
				<div className={styles.formlabin}>
					<input
						className={styles.forminput}
						id="firstName"
						name="firstName"
						type="text"
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.firstName}
						placeholder="John_Doe"
					/>
				</div>

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
							Create Account
						</button>
					</div>
					<div className={styles.login}>Already Have An Account? Sign In</div>
				</div>
			</form>
		</div>
	);
};

export default SignUp;
