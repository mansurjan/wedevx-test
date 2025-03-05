import Sidebar from "../sidebar/Sidebar";
import styles from "./MainLayout.module.css";
import ProtectedRoute from "../ProtectedRoute";

export default function MainLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<ProtectedRoute>
			<div className={styles.layout}>
				<Sidebar />
				<main className={styles.main}>{children}</main>
			</div>
		</ProtectedRoute>
	);
}
