"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Sidebar.module.css";

const SIDEBAR_MENU = [
	{
		label: "Leads",
		href: "/",
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

	const isActive = (path: string) => {
		return pathname === path ? styles.active : "";
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
				<div className={styles.avatar}>A</div>
				<div className={styles.username}>Admin</div>
			</div>
		</div>
	);
}
