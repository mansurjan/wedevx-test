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

interface LeadFormProps {
	isHomePage?: boolean;
}

export default function LeadForm({ isHomePage = false }: LeadFormProps) {
	const [formData, setFormData] = useState<LeadFormData>({});
	const [submitted, setSubmitted] = useState(false);
	const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
	const [attemptedSubmit, setAttemptedSubmit] = useState(false);
	const [isClient, setIsClient] = useState(false);
	const [submitError, setSubmitError] = useState<string | null>(null);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [fileError, setFileError] = useState<string | null>(null);

	useEffect(() => {
		setIsClient(true);
	}, []);

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
		setAttemptedSubmit(true);
		setSubmitError(null);

		const errors = validateForm(formData);
		if (Object.keys(errors).length > 0) {
			setFieldErrors(errors);
			return;
		}

		try {
			setIsSubmitting(true);
			const response = await fetch("/api/leads", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
			});

			if (!response.ok) {
				const errorData = await response.json().catch(() => null);
				throw new Error(
					errorData?.message ||
						`Error ${response.status}: Failed to submit form`
				);
			}

			setSubmitted(true);
			setFieldErrors({});
		} catch (error) {
			console.error("Error submitting form:", error);
			setSubmitError(
				error instanceof Error
					? error.message
					: "An unexpected error occurred. Please try again."
			);
		} finally {
			setIsSubmitting(false);
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
		setFileError(null);

		if (file) {
			const validTypes = [
				"application/pdf",
				"application/msword",
				"application/vnd.openxmlformats-officedocument.wordprocessingml.document",
			];
			if (!validTypes.includes(file.type)) {
				setFileError("Please upload a PDF or Word document");
				return;
			}

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
						<DocumentIcon />
					</div>
					<h1>Thank You</h1>
					<p>
						Your information was submitted to our team of immigration attorneys.
						Expect an email from hello@tryalma.ai.
					</p>
					<div className={styles.buttonContainer}>
						<Link href="/" className={styles.homeButton}>
							Submit Another Form
						</Link>
						<Link href="/dashboard" className={styles.dashboardButton}>
							Go to Dashboard
						</Link>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className={styles.formContainer}>
			{!isHomePage && (
				<Link href="/dashboard" className={styles.backButton}>
					← Back
				</Link>
			)}
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

			{submitError && <div className={styles.errorMessage}>{submitError}</div>}

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
					<label
						htmlFor="resume"
						style={{ color: "gray", marginBottom: "0.25rem" }}>
						Resume/CV (PDF, DOC, or DOCX only)
					</label>
					<input
						type="file"
						id="resume"
						onChange={handleFileChange}
						accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
						className={`${styles.fileInput} ${
							(attemptedSubmit && fieldErrors.resume) || fileError
								? styles.inputError
								: ""
						}`}
					/>
					{fileError && <div className={styles.fieldError}>{fileError}</div>}
					{attemptedSubmit && fieldErrors.resume && !fileError && (
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

				<button
					type="submit"
					className={styles.submitButton}
					disabled={isSubmitting}>
					{isSubmitting ? "Submitting..." : "Submit"}
				</button>
			</form>
		</div>
	);
}
