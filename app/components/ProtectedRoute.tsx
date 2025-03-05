"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";

export default function ProtectedRoute({
	children,
}: {
	children: React.ReactNode;
}) {
	const { isAuthenticated } = useAuth();
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const timer = setTimeout(() => {
			setIsLoading(false);
			if (!isAuthenticated) {
				router.push("/login");
			}
		}, 100);

		return () => clearTimeout(timer);
	}, [isAuthenticated, router]);

	if (isLoading) {
		return null;
	}

	if (!isAuthenticated) {
		return null;
	}

	return <>{children}</>;
}
