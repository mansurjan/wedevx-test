import Sidebar from "../sidebar/Sidebar";
import styles from "./MainLayout.module.css";

export default function MainLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className={styles.layout}>
			<Sidebar />
			<main className={styles.main}>{children}</main>
		</div>
	);
}
