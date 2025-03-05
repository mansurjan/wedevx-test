"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import styles from "./Sidebar.module.css";
import { useAuth } from "@/lib/auth";

const SIDEBAR_MENU = [
	{
		label: "Leads",
		href: "/dashboard",
	},
	{
		label: "Settings",
		href: "/settings",
	},
	{
		label: "About",
		href: "/about",
	},
];

export default function Sidebar() {
	const pathname = usePathname();
	const router = useRouter();
	const { user, logout } = useAuth();

	const isActive = (path: string) => {
		return pathname === path ? styles.active : "";
	};

	const handleLogout = () => {
		logout();
		router.push("/login");
	};

	return (
		<div className={styles.sidebar}>
			<div className={styles.logo}>
				<Link href="/">
					<h1>almă</h1>
				</Link>
			</div>
			<nav className={styles.nav}>
				<ul>
					{SIDEBAR_MENU.map((menuItem) => (
						<li key={menuItem.href}>
							<Link href={menuItem.href} className={isActive(menuItem.href)}>
								{menuItem.label}
							</Link>
						</li>
					))}
				</ul>
			</nav>
			<div className={styles.user}>
				<div className={styles.avatar}>{user?.name?.[0] || "A"}</div>
				<div className={styles.username}>{user?.name || "Admin"}</div>
				<button onClick={handleLogout} className={styles.logoutButton}>
					Logout
				</button>
			</div>
		</div>
	);
}
