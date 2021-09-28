import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import styles from "./SignUp.module.css";
import { useSelector, useDispatch } from "react-redux";

const Name = () => {
	const formik = useFormik({
		initialValues: {
			name: "",
		},
		validationSchema: Yup.object({
			name: Yup.string().required("Incomplete form"),
		}),
		onSubmit: (values) => {
			console.log("YEllo");
		},
	});
	return (
		<div className={styles.form}>
			<form className={styles.inputs} onSubmit={formik.handleSubmit}>
				<div className={styles.formheading}>Set A Nickname</div>

				<div className={styles.formlabin}>
					<input
						className={styles.forminput}
						id="email"
						name="email"
						type="text"
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.email}
						placeholder="Johnny"
					/>
				</div>
				<div className={styles.formlabin}>
					<div className={styles.submitbtn}>
						<button className={styles.submitbtntext} type="submit">
							Next
						</button>
					</div>
				</div>
			</form>
		</div>
	);
};

export default Name;
