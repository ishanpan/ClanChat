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
				.required("Required"),
			lastName: Yup.string()
				.max(20, "Must be 20 characters or less")
				.required("Required"),
			email: Yup.string().email("Invalid email address").required("Required"),
		}),
		onSubmit: (values) => {
			console.log(values.firstName);
		},
	});
	return (
		<form className={styles.form} nSubmit={formik.handleSubmit}>
			<label className={styles.formVal} htmlFor="firstName">
				First Name
			</label>
			<input
				id="firstName"
				name="firstName"
				type="text"
				onChange={formik.handleChange}
				onBlur={formik.handleBlur}
				value={formik.values.firstName}
			/>
			{formik.touched.firstName && formik.errors.firstName ? (
				<div>{formik.errors.firstName}</div>
			) : null}

			<label className={styles.formVal} htmlFor="lastName">
				Last Name
			</label>
			<input
				id="lastName"
				name="lastName"
				type="text"
				onChange={formik.handleChange}
				onBlur={formik.handleBlur}
				value={formik.values.lastName}
			/>
			{formik.touched.lastName && formik.errors.lastName ? (
				<div>{formik.errors.lastName}</div>
			) : null}

			<label className={styles.formVal} htmlFor="email">
				Email Address
			</label>
			<input
				id="email"
				name="email"
				type="email"
				onChange={formik.handleChange}
				onBlur={formik.handleBlur}
				value={formik.values.email}
			/>
			{formik.touched.email && formik.errors.email ? (
				<div>{formik.errors.email}</div>
			) : null}

			<button type="submit">Submit</button>
		</form>
	);
};

export default SignUp;
