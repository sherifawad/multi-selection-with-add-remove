"use client";

import useCurrentUrl from "@/hooks/useCurrentUrl";
import { CodeBlockCommand } from "./code-block-command";

export default function Installation() {
	const baseUrl = useCurrentUrl();

	return (
		<div className="max-w-md px-8">
			<CodeBlockCommand
				__bunCommand__={`bunx --bun shadcn@latest add ${baseUrl}multi-selection`}
				__npmCommand__={`npx shadcn@latest add ${baseUrl}multi-selection`}
				__yarnCommand__={`npx shadcn@latest add ${baseUrl}multi-selection`}
				__pnpmCommand__={`pnpm dlx shadcn@latest add ${baseUrl}multi-selection`}
			/>
		</div>
	);
}
