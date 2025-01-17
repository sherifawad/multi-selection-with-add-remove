import * as fs from "fs/promises";
import { NextResponse } from "next/server";
import path from "path";

export async function GET() {
	try {
		// Get the path to the registry file
		const registryPath = path.join(process.cwd(), "registry/multi-selection.json");

		// Read the file
		const fileContent = await fs.readFile(registryPath, "utf8");

		// Parse JSON content
		const registryData = JSON.parse(fileContent);

		// Return the response with proper headers
		return NextResponse.json(registryData, {
			headers: {
				"Content-Type": "application/json",
				"Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
			},
		});
	} catch (error) {
		console.error("Error reading registry file:", error);
		return NextResponse.json({ error: "Failed to load registry data" }, { status: 500 });
	}
}
