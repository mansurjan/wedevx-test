// Simple mock authentication
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
	isAuthenticated: boolean;
	user: { name: string; email: string } | null;
	login: (email: string, password: string) => Promise<boolean>;
	logout: () => void;
}

export const useAuth = create<AuthState>()(
	persist(
		(set) => ({
			isAuthenticated: false,
			user: null,
			login: async (email, password) => {
				if (email === "admin@alma.com" && password === "password123") {
					set({ isAuthenticated: true, user: { name: "Admin", email } });
					return true;
				}
				return false;
			},
			logout: () => set({ isAuthenticated: false, user: null }),
		}),
		{
			name: "auth-storage",

			storage: {
				getItem: (name) => {
					if (typeof window === "undefined") return null;
					const str = localStorage.getItem(name);
					return str ? JSON.parse(str) : null;
				},
				setItem: (name, value) => {
					if (typeof window !== "undefined") {
						localStorage.setItem(name, JSON.stringify(value));
					}
				},
				removeItem: (name) => {
					if (typeof window !== "undefined") {
						localStorage.removeItem(name);
					}
				},
			},
		}
	)
);
