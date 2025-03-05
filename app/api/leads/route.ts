import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

interface Lead {
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

async function getLeadsData() {
	try {
		const filePath = path.join(process.cwd(), "data", "leads.json");
		const fileData = await fs.readFile(filePath, "utf8");
		return JSON.parse(fileData);
	} catch (error) {
		console.error("Error reading leads.json:", error);
		return { leads: [] };
	}
}

async function writeLeadsData(data: Lead) {
	try {
		const filePath = path.join(process.cwd(), "data", "leads.json");
		await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf8");
	} catch (error) {
		console.error("Error writing to leads.json:", error);
		throw error;
	}
}

export async function GET() {
	const data = await getLeadsData();
	return NextResponse.json(data.leads);
}

export async function POST(request: Request) {
	const lead = await request.json();
	const data = await getLeadsData();

	const newLead = {
		...lead,
		id: Date.now().toString(),
		submittedAt: new Date().toISOString(),
		status: "PENDING",
	};

	data.leads.unshift(newLead);
	await writeLeadsData(data);

	return NextResponse.json(newLead);
}

export async function PATCH(request: Request) {
	const { id, status } = await request.json();
	const data = await getLeadsData();

	const leadIndex = data.leads.findIndex((l: Lead) => l.id === id);

	if (leadIndex !== -1) {
		data.leads[leadIndex].status = status;
		await writeLeadsData(data);
		return NextResponse.json(data.leads[leadIndex]);
	}

	return NextResponse.json({ error: "Lead not found" }, { status: 404 });
}
