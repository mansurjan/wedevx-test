"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import styles from "./Login.module.css";

export default function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();
	const { login } = useAuth();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError("");
		setIsLoading(true);

		try {
			const success = await login(email, password);
			if (success) {
				router.push("/dashboard");
			} else {
				setError("Invalid email or password");
			}
		} catch (err) {
			console.error("Login error:", err);
			setError("An error occurred during login");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className={styles.container}>
			<div className={styles.loginForm}>
				<h1>Login to Alma</h1>
				{error && <div className={styles.error}>{error}</div>}
				<form onSubmit={handleSubmit}>
					<div className={styles.formGroup}>
						<label htmlFor="email">Email</label>
						<input
							type="email"
							id="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
						/>
					</div>
					<div className={styles.formGroup}>
						<label htmlFor="password">Password</label>
						<input
							type="password"
							id="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
					</div>
					<button
						type="submit"
						className={styles.loginButton}
						disabled={isLoading}>
						{isLoading ? "Logging in..." : "Login"}
					</button>
				</form>
				<p className={styles.hint}>
					Email: admin@alma.com
					<br />
					Password: password123
				</p>
			</div>
		</div>
	);
}
