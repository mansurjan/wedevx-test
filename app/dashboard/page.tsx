"use client";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { fetchLeads, updateLeadStatus } from "@/lib/slices/leadSlice";
import Link from "next/link";
import MainLayout from "../components/main-layout/MainLayout";
import styles from "./Dashboard.module.css";

export default function LeadsManagement() {
	const dispatch = useAppDispatch();
	const { leads, status, error } = useAppSelector((state) => state.leads);
	const [searchTerm, setSearchTerm] = useState("");
	const [statusFilter, setStatusFilter] = useState("all");
	const [currentPage, setCurrentPage] = useState(1);
	const [updateError, setUpdateError] = useState<string | null>(null);
	const leadsPerPage = 5;

	useEffect(() => {
		dispatch(fetchLeads());
	}, [dispatch]);

	const handleStatusUpdate = async (id: string) => {
		try {
			setUpdateError(null);
			await dispatch(updateLeadStatus({ id, status: "REACHED_OUT" })).unwrap();
		} catch (err) {
			setUpdateError("Failed to update lead status. Please try again.");
			console.error("Error updating lead status:", err);
		}
	};

	const filteredLeads = leads.filter((lead) => {
		const matchesSearch = `${lead.firstName} ${lead.lastName}`
			.toLowerCase()
			.includes(searchTerm.toLowerCase());
		const matchesStatus =
			statusFilter === "all" || lead.status === statusFilter;
		return matchesSearch && matchesStatus;
	});

	const indexOfLastLead = currentPage * leadsPerPage;
	const indexOfFirstLead = indexOfLastLead - leadsPerPage;
	const currentLeads = filteredLeads.slice(indexOfFirstLead, indexOfLastLead);
	const totalPages = Math.ceil(filteredLeads.length / leadsPerPage);

	const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

	if (status === "loading")
		return (
			<MainLayout>
				<div className={styles.loading}>Loading...</div>
			</MainLayout>
		);

	return (
		<MainLayout>
			<div className={styles.container}>
				<div className={styles.header}>
					<h2>Leads</h2>
					<Link href="/" className={styles.addLeadButton}>
						Add New Lead
					</Link>
				</div>

				{error && (
					<div className={styles.errorMessage}>
						Error loading leads: {error}
					</div>
				)}

				{updateError && (
					<div className={styles.errorMessage}>{updateError}</div>
				)}

				<div className={styles.filters}>
					<input
						type="search"
						placeholder="Search"
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						className={styles.searchInput}
					/>

					<select
						value={statusFilter}
						onChange={(e) => setStatusFilter(e.target.value)}
						className={styles.statusFilter}>
						<option value="all">All Status</option>
						<option value="PENDING">Pending</option>
						<option value="REACHED_OUT">Reached Out</option>
					</select>
				</div>

				{leads.length === 0 && !error ? (
					<div className={styles.noLeads}>No leads found</div>
				) : (
					<table className={styles.leadsTable}>
						<thead>
							<tr>
								<th>Name</th>
								<th>Submitted</th>
								<th>Status</th>
								<th>Country</th>
								<th>Actions</th>
							</tr>
						</thead>
						<tbody>
							{currentLeads.map((lead) => (
								<tr key={lead.id}>
									<td>{`${lead.firstName} ${lead.lastName}`}</td>
									<td className={styles.submittedAt}>
										{lead.submittedAt?.slice(0, 10)}
									</td>
									<td>
										<span className={`${styles.status} ${styles[lead.status]}`}>
											{lead.status}
										</span>
									</td>
									<td>
										{lead.visasOfInterest.map((country) => (
											<p key={country}>{country}</p>
										))}
									</td>
									<td>
										{lead.status === "PENDING" && (
											<button
												onClick={() => handleStatusUpdate(lead.id)}
												className={styles.actionButton}>
												Reached Out
											</button>
										)}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				)}

				{totalPages > 1 && (
					<div className={styles.pagination}>
						<button
							onClick={() => paginate(currentPage - 1)}
							disabled={currentPage === 1}
							className={styles.paginationButton}>
							&lt;
						</button>

						{Array.from({ length: totalPages }, (_, i) => (
							<button
								key={i + 1}
								onClick={() => paginate(i + 1)}
								className={`${styles.paginationButton} ${
									currentPage === i + 1 ? styles.activePage : ""
								}`}>
								{i + 1}
							</button>
						))}

						<button
							onClick={() => paginate(currentPage + 1)}
							disabled={currentPage === totalPages}
							className={styles.paginationButton}>
							&gt;
						</button>
					</div>
				)}
			</div>
		</MainLayout>
	);
}
