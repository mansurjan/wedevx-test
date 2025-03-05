"use client";
import { useState, useEffect } from "react";
import styles from "./LeadForm.module.css";
import Link from "next/link";
import DocumentIcon from "../icons/DocumentIcon";

interface LeadFormData {
	firstName?: string;
	lastName?: string;
	email?: string;
	linkedInProfile?: string;
	visasOfInterest?: string[];
	resume?: string;
	additionalInfo?: string;
}

interface FieldErrors {
	[key: string]: string;
}

export default function LeadForm() {
	const [formData, setFormData] = useState<LeadFormData>({});
	const [submitted, setSubmitted] = useState(false);
	const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
	const [attemptedSubmit, setAttemptedSubmit] = useState(false);
	const [isClient, setIsClient] = useState(false);

	useEffect(() => {
		setIsClient(true);
	}, []);

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
		setAttemptedSubmit(true);

		const errors = validateForm(formData);
		if (Object.keys(errors).length > 0) {
			setFieldErrors(errors);
			return;
		}

		try {
			const response = await fetch("/api/leads", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
			});

			if (!response.ok) {
				throw new Error("Failed to submit form");
			}

			setSubmitted(true);
			setFieldErrors({});
		} catch (error) {
			console.error("Error submitting form:", error);
		}
	};

	const validateForm = (data: LeadFormData): FieldErrors => {
		const errors: FieldErrors = {};

		if (!data.firstName) errors.firstName = "First Name is required.";
		if (!data.lastName) errors.lastName = "Last Name is required.";
		if (!data.email) errors.email = "Email is required.";
		else if (!/\S+@\S+\.\S+/.test(data.email))
			errors.email = "Email is invalid.";
		if (!data.linkedInProfile)
			errors.linkedInProfile = "LinkedIn Profile is required.";
		if (!data.visasOfInterest || data.visasOfInterest.length === 0)
			errors.visasOfInterest = "At least one Visa of Interest is required.";
		if (!data.resume) errors.resume = "Resume is required.";

		return errors;
	};

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = () => {
				setFormData({ ...formData, resume: reader.result as string });
				if (fieldErrors.resume) {
					const newErrors = { ...fieldErrors };
					delete newErrors.resume;
					setFieldErrors(newErrors);
				}
			};
			reader.readAsDataURL(file);
		}
	};

	if (!isClient) {
		return <div className={styles.formContainer}>Loading form...</div>;
	}

	if (submitted) {
		return (
			<div className={styles.thankYouContainer}>
				<div className={styles.thankYouContent}>
					<div className={styles.documentIcon}>
						<svg
							width="80"
							height="80"
							viewBox="0 0 80 80"
							fill="none"
							xmlns="http://www.w3.org/2000/svg">
							<path
								d="M50 10H20C17.3478 10 14.8043 11.0536 12.9289 12.9289C11.0536 14.8043 10 17.3478 10 20V60C10 62.6522 11.0536 65.1957 12.9289 67.0711C14.8043 68.9464 17.3478 70 20 70H60C62.6522 70 65.1957 68.9464 67.0711 67.0711C68.9464 65.1957 70 62.6522 70 60V30L50 10Z"
								fill="#C4B5FD"
							/>
							<path
								d="M30 40H50M30 50H50M50 10V30H70"
								stroke="#7C3AED"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
					</div>
					<h1>Thank You</h1>
					<p>
						Your information was submitted to our team of immigration attorneys.
						Expect an email from hello@tryalma.ai.
					</p>
					<Link href="/" className={styles.homeButton}>
						Go Back to Homepage
					</Link>
				</div>
			</div>
		);
	}

	return (
		<div className={styles.formContainer}>
			<Link href="/" className={styles.backButton}>
				← Back
			</Link>
			<div className={styles.formHeader}>
				<DocumentIcon />

				<p className={styles.formHeaderTitle}>
					Want to understand your visa options?
				</p>
				<p className={styles.formHeaderDescription}>
					Submit the form below and our team of experienced attorneys will
					review your information and send a preliminary assesment of your case
					based on your goals
				</p>
			</div>
			<form onSubmit={handleSubmit}>
				<div className={styles.formGroup}>
					<input
						placeholder="First Name"
						type="text"
						id="firstName"
						value={formData.firstName || ""}
						onChange={(e) =>
							setFormData({ ...formData, firstName: e.target.value })
						}
						className={
							attemptedSubmit && fieldErrors.firstName ? styles.inputError : ""
						}
					/>
					{attemptedSubmit && fieldErrors.firstName && (
						<div className={styles.fieldError}>{fieldErrors.firstName}</div>
					)}
				</div>

				<div className={styles.formGroup}>
					<input
						placeholder="Last Name"
						type="text"
						id="lastName"
						value={formData.lastName || ""}
						onChange={(e) =>
							setFormData({ ...formData, lastName: e.target.value })
						}
						className={
							attemptedSubmit && fieldErrors.lastName ? styles.inputError : ""
						}
					/>
					{attemptedSubmit && fieldErrors.lastName && (
						<div className={styles.fieldError}>{fieldErrors.lastName}</div>
					)}
				</div>

				<div className={styles.formGroup}>
					<input
						placeholder="Email"
						type="email"
						id="email"
						value={formData.email || ""}
						onChange={(e) =>
							setFormData({ ...formData, email: e.target.value })
						}
						className={
							attemptedSubmit && fieldErrors.email ? styles.inputError : ""
						}
					/>
					{attemptedSubmit && fieldErrors.email && (
						<div className={styles.fieldError}>{fieldErrors.email}</div>
					)}
				</div>

				<div className={styles.formGroup}>
					<input
						placeholder="LinkedIn Profile/Personal Website URL"
						type="text"
						id="linkedInProfile"
						value={formData.linkedInProfile || ""}
						onChange={(e) =>
							setFormData({ ...formData, linkedInProfile: e.target.value })
						}
						className={
							attemptedSubmit && fieldErrors.linkedInProfile
								? styles.inputError
								: ""
						}
					/>
					{attemptedSubmit && fieldErrors.linkedInProfile && (
						<div className={styles.fieldError}>
							{fieldErrors.linkedInProfile}
						</div>
					)}
				</div>

				<div className={styles.formGroup}>
					<label htmlFor="resume" style={{ marginBottom: "0.25rem" }}>
						Resume/CV{" "}
					</label>
					<input
						type="file"
						id="resume"
						onChange={handleFileChange}
						className={`${styles.fileInput} ${
							attemptedSubmit && fieldErrors.resume ? styles.inputError : ""
						}`}
					/>
					{attemptedSubmit && fieldErrors.resume && (
						<div className={styles.fieldError}>{fieldErrors.resume}</div>
					)}
				</div>

				<div style={{ textAlign: "center", marginTop: "2rem" }}>
					<DocumentIcon />
				</div>
				<p className={styles.formHeaderTitle}>Visa categories of interest?</p>

				<div className={styles.formGroup}>
					<div className={styles.checkboxGroup}>
						{["O-1", "EB-1A", "EB-2 NIV", "I don't know"].map((visa) => (
							<div key={visa} className={styles.checkbox}>
								<input
									type="checkbox"
									id={`visa-${visa}`}
									checked={formData.visasOfInterest?.includes(visa) || false}
									onChange={(e) => {
										const currentVisas = formData.visasOfInterest || [];
										const newVisas = e.target.checked
											? [...currentVisas, visa]
											: currentVisas.filter((v) => v !== visa);
										setFormData({ ...formData, visasOfInterest: newVisas });
									}}
								/>
								<label htmlFor={`visa-${visa}`}>{visa}</label>
							</div>
						))}
					</div>
					{attemptedSubmit && fieldErrors.visasOfInterest && (
						<div className={styles.fieldError}>
							{fieldErrors.visasOfInterest}
						</div>
					)}
				</div>

				<div style={{ textAlign: "center", marginTop: "2rem" }}>
					<DocumentIcon />
				</div>
				<p className={styles.formHeaderTitle}>How can we help you?</p>
				<div className={styles.formGroup}>
					<textarea
						id="additionalInfo"
						value={formData.additionalInfo || ""}
						onChange={(e) =>
							setFormData({ ...formData, additionalInfo: e.target.value })
						}
						rows={4}
					/>
				</div>

				<button type="submit" className={styles.submitButton}>
					Submit
				</button>
			</form>
		</div>
	);
}
