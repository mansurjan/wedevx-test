import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

export interface Lead {
	id: string;
	firstName: string;
	lastName: string;
	email: string;
	linkedInProfile: string;
	visasOfInterest: string[];
	country: string;
	submittedAt: string;
	status: "PENDING" | "REACHED_OUT";
	resume?: string;
	additionalInfo?: string;
}

interface LeadState {
	leads: Lead[];
	status: "idle" | "loading" | "succeeded" | "failed";
	error: string | null;
}

const initialState: LeadState = {
	leads: [],
	status: "idle",
	error: null,
};

// Thunks
export const fetchLeads = createAsyncThunk("leads/fetchLeads", async () => {
	const response = await fetch("/api/leads");
	if (!response.ok) {
		throw new Error("Failed to fetch leads");
	}
	return response.json();
});

export const updateLeadStatus = createAsyncThunk(
	"leads/updateStatus",
	async ({ id, status }: { id: string; status: "PENDING" | "REACHED_OUT" }) => {
		const response = await fetch("/api/leads", {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ id, status }),
		});

		if (!response.ok) {
			throw new Error("Failed to update lead status");
		}

		return response.json();
	}
);

const leadSlice = createSlice({
	name: "leads",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchLeads.pending, (state) => {
				state.status = "loading";
			})
			.addCase(fetchLeads.fulfilled, (state, action: PayloadAction<Lead[]>) => {
				state.status = "succeeded";
				state.leads = action.payload;
			})
			.addCase(fetchLeads.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error.message || null;
			})
			.addCase(
				updateLeadStatus.fulfilled,
				(state, action: PayloadAction<Lead>) => {
					const index = state.leads.findIndex(
						(lead) => lead.id === action.payload.id
					);
					if (index !== -1) {
						state.leads[index] = action.payload;
					}
				}
			);
	},
});

export default leadSlice.reducer;
