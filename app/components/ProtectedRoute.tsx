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
		// Short timeout to ensure the auth state is loaded from localStorage
		const timer = setTimeout(() => {
			setIsLoading(false);
			if (!isAuthenticated) {
				router.push("/login");
			}
		}, 100);

		return () => clearTimeout(timer);
	}, [isAuthenticated, router]);

	// Show nothing during the initial loading
	if (isLoading) {
		return null;
	}

	// If not authenticated after loading, show nothing
	if (!isAuthenticated) {
		return null;
	}

	// If authenticated, show the children
	return <>{children}</>;
}
